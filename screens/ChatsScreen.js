import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CreateChatIcon from '../components/CreateChatIcon';
import { auth, database } from '../config/firebase';
import GlobalContext from '../context/Context';
import useContacts from '../hooks/useContacts';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import List from '../components/List';

const ChatsScreen = () => {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const contacts = useContacts();

  const chatsQuery = query(
    collection(database, "rooms"),
    where("participantsArray", "array-contains", currentUser.phoneNumber),
    orderBy("lastMessage.createdAt", "desc")
  );
  
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.phoneNumber !== currentUser.phoneNumber),
      }));
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.phoneNumber === user.phoneNumber);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }

  return (
    <View style={styles.container}>
      {rooms.map((room) => (
        <List
          type="Chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contacts)}
        />
      ))}
      <CreateChatIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingRight: 10,
  }
});

export default ChatsScreen;
