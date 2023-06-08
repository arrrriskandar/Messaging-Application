//import liraries
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CreateChatIcon from '../components/CreateChatIcon';
import { auth, database } from '../config/firebase';
import GlobalContext from '../context/Context';
import useContacts from '../hooks/useContacts';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import ListItem from '../components/List';

// create a component
const ChatsScreen = () => {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const contacts = useContacts();

  const chatsQuery = query(
    collection(database, "rooms"),
    where("participantsArray", "array-contains", currentUser.phoneNumber)
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
      <ListItem
        type="chat"
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

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 5, 
    paddingRight: 10,
  }
});

//make this component available to the app
export default ChatsScreen;


