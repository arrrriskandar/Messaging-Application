//import liraries
import React, { useState, useContext, useEffect } from 'react';
import { FlatList } from 'react-native';
import useContacts from '../hooks/useContacts';
import GlobalContext from '../context/Context';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { database } from '../config/firebase';
import List from '../components/List';
import { useRoute } from '@react-navigation/native';

const ContactsScreen = () => {
  const contacts = useContacts();
  const route = useRoute();
  const image = route.params && route.params.image;
  return (
    <FlatList
      style={{ flex: 1, padding: 10 }}
      data={contacts}
      keyExtractor={(_, i) => i}
      renderItem={({ item }) => <ContactPreview contact={item} image={image} />}
    />
  );
}

function ContactPreview({ contact, image }) {
  const { unfilteredRooms } = useContext(GlobalContext);
  const [user, setUser] = useState(contact);

  useEffect(() => {
    const q = query(
      collection(database, "users"),
      where("phoneNumber", "==", contact.phoneNumber)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser) => ({ ...prevUser, ...userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);


  return (
    <List
      style={{ marginTop: 7 }}
      type="Contacts"
      user={user}
      image={image}
      room={unfilteredRooms.find((room) =>
        room.participantsArray.includes(contact.phoneNumber)
      )}
    />
  );
}

export default ContactsScreen;
