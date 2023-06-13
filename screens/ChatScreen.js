// @refresh reset
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Image, Modal } from 'react-native';
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { auth, database } from '../config/firebase';
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { Actions, Bubble, Day, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { uploadImage } from '../utils/ImageUpload';
import { pickImageFromCamera, pickImageFromLibrary } from '../utils/ImageSelect';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from '@expo/react-native-action-sheet';

const randomId = nanoid();

const ChatScreen = () => {
  const [roomHash, setRoomHash] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { currentUser } = auth;
  const route = useRoute();
  const room = route.params.room;
  const selectedImage = route.params.image;
  const userB = route.params.user;
    const { showActionSheetWithOptions } = useActionSheet();

  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        profilePicture: currentUser.photoURL,
      }
    : { 
      name: currentUser.displayName, 
      _id: currentUser.uid 
      };

  const roomId = room ? room.id : randomId;

  const roomRef = doc(database, "rooms", roomId);
  const roomMessagesRef = collection(database, "rooms", roomId, "messages");

  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: currentUser.displayName,
          phoneNumber: currentUser.phoneNumber,
        };
        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }
        const userBData = {
          displayName: userB.contactName || userB.displayName || "",
          phoneNumber: userB.phoneNumber,
        };
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.phoneNumber, userB.phoneNumber],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
      const phoneNumberHash = `${currentUser.phoneNumber}:${userB.phoneNumber}`;
      setRoomHash(phoneNumberHash);
      if (selectedImage && selectedImage.uri) {
        await sendImage(selectedImage.uri, phoneNumberHash);
      }
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function onSend(messages = []) {
    const writes = messages.map((m) => addDoc(roomMessagesRef, m));
    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage }));
    await Promise.all(writes);
  }


  async function sendImage(uri, roomPath) {
    const { url, fileName } = await uploadImage(
      uri,
      `images/rooms/${roomPath || roomHash}`
    );
    const message = {
      _id: fileName,
      text: "",
      createdAt: new Date(),
      user: senderUser,
      image: url,
    };
    const lastMessage = { ...message, text: "Image" };
    await Promise.all([
      addDoc(roomMessagesRef, message),
      updateDoc(roomRef, { lastMessage }),
    ]);
  }

  async function handlePhotoPicker() {
    const options = ['Take Photo', 'Choose from Library', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          const result = await pickImageFromCamera();
          if (!result.cancelled) {
            await sendImage(result.uri);
          }
        } else if (buttonIndex === 1) {
          const result = await pickImageFromLibrary();
          if (!result.cancelled) {
            await sendImage(result.uri);
          }
        }
      }
    );
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/chat-background.png")}
      style={styles.imageBackground}
    >
      <GiftedChat
        onSend={onSend}
        messages={messages}
        user={senderUser}
        renderAvatar={null}
        renderActions={(props) => (
          <Actions
            {...props}
            containerStyle={styles.actionsContainer}
            onPressActionButton={handlePhotoPicker}
            icon={() => (
              <Ionicons name="camera" size={30} color='white' />
            )}
          />
        )}
        timeTextStyle={{ right: { color: 'gray' } }}
        renderSend={(props) => {
          const { text, messageIdGenerator, user, onSend } = props;
          return (
            <TouchableOpacity
              style={styles.sendIconContainer}
              onPress={() => {
                if (text && onSend) {
                  onSend(
                    {
                      text: text.trim(),
                      user,
                      _id: messageIdGenerator,
                    },
                    true
                  );
                }
              }}
            >
              <Ionicons name="send" size={20} color='white' />
            </TouchableOpacity>
          );
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            placeholderTextColor='white'
            textInputStyle={{color: 'white'}}
            containerStyle={styles.inputToolBarContainer}
          />
        )}
        renderBubble={(props) => (
          <Bubble
            {...props}
            textStyle={{ 
              right: { 
                color: 'white',
                },
              left: { 
                color : 'white',
                },
              }}
            wrapperStyle={{
              left: {
                backgroundColor: '#212121',
              },
              right: {
                backgroundColor: '#1F2D59',
              },
            }}
          />
        )}
        renderMessageImage={(props) => {
          return (
            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                transparent={true}
                >
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: props?.currentMessage?.image }}
                  />
              </TouchableOpacity>
              <Modal
                visible={modalVisible}
                transparent={true}
                >
                <TouchableOpacity
                  onPress={() => {
                  setModalVisible(false);
                  }}
                  transparent={true}
                  style={styles.modalImageContainer}
                  >
                  <Image
                    resizeMode="contain"
                    style={styles.modalImage}
                    source={{ uri: props?.currentMessage?.image }}
                  />
                </TouchableOpacity>
              </Modal>
            </View>
          );
        }}
        dateFormat='DD MMM YYYY'
        renderDay={(props) => (
          <Day
            {...props}
            textStyle={styles.date}
            wrapperStyle={styles.dateWrapper}
          />
       )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  date: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dateWrapper: {
    backgroundColor: '#1F2D59',
    padding: 8,
    borderRadius: 8,
  },
  actionsContainer: {
    position: "absolute",
    right: 50,
    bottom: 5,
    zIndex: 9999,
  },
  sendIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    marginHorizontal: 5,
  },
  inputToolBarContainer: {
    padding: 5,
    backgroundColor: '#1F2D59',
  },
  imageContainer: {
    borderRadius: 15, 
    padding: 2,
  },
  image : {
    width: 200,
    height: 200,
    padding: 6,
    borderRadius: 15,
  },
  modalImageContainer: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage : {
    width: '100%',
    height: '100%',
  },
});

export default ChatScreen;
