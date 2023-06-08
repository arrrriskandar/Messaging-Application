//import liraries
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import ProfilePicture from './ProfilePicture';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { windowHeight, windowWidth } from '../utils/Dimensions';

// create a component
const ChatHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.profilePictureContainer}
        transparent={true}
        >
        <ProfilePicture 
          width={40} 
          height={40}
          user={route.params.user} 
          resize='cover'
          />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        >
        <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.profilePictureModalContainer}
            transparent={true}
            >
          <ProfilePicture 
              user={route.params.user} 
              width={windowWidth}
              height={windowHeight}
              resize='contain'
          />
        </TouchableOpacity>
      </Modal>
      <View
        style={styles.contactNamecontainer}
        >
        <Text style={styles.contactName}>
          {route.params.user.contactName || route.params.user.displayName}
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  profilePictureContainer: {
    borderRadius: 40,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    overflow: 'hidden',
  },
  profilePictureModalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactNamecontainer: {
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  contactName: {
    color: 'white', 
    fontSize: 18,
  },
});

export default ChatHeader;
