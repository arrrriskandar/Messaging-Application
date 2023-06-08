import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../config/firebase";

export default function useContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          const filteredContacts = await Promise.all(
            data
              .filter((c) => c.firstName && c.phoneNumbers)
              .map(async (contact) => {
                const q = query(
                  collection(database, "users"),
                  where("phoneNumber", "==", contact.phoneNumbers[0].number)
                );
                const snapshot = await getDocs(q);
                if (snapshot.docs.length > 0) {
                  return {
                    contactName: getContactName(contact),
                    phoneNumber: contact.phoneNumbers[0].number,
                  };
                }
                return null;
              })
          );
          const validContacts = filteredContacts.filter(Boolean);
          setContacts(validContacts);
        }
      }
    })();
  }, []);

  return contacts;
}

function getContactName(contact) {
  if (contact.firstName && contact.lastName) {
    return `${contact.firstName} ${contact.lastName}`;
  }
  return contact.firstName;
}