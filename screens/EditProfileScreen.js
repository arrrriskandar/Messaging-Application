import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { auth, database } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { Alert } from 'react-native';
import ProfilePicture from '../components/ProfilePicture';
import { pickImage } from '../utils/ImageSelect';
import { uploadImage } from '../utils/ImageUpload';
import { deleteProfilePicture } from '../utils/DeleteUpload';
import { doc, updateDoc } from 'firebase/firestore';
import { windowHeight, windowWidth } from '../utils/Dimensions';

// create a component
const EditProfileScreen = ({navigation}) => {
  const user = auth.currentUser;
  const [modalVisible, setModalVisible] = useState(false);

  async function editProfilePicture(){
    let photoURL;
    const result = await pickImage();
    if (!result.cancelled) {
      if (user.photoURL){
        await deleteProfilePicture(
          `images/${user.uid}`,
          "profilePicture"
        );
      }
      const { url } = await uploadImage(
        result.uri,
        `images/${user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }
    await updateDoc(doc(database, "users", user.uid), {photoURL:photoURL})
  }

  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          {user.displayName}
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.profilePictureContainer}
          transparent={true}
          >
          <ProfilePicture 
            user={user}
            width={200}
            height={200}
            resize='cover'
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
            style={styles.profilePictureModalContainer}
            transparent={true}
            >
            <ProfilePicture 
              user={user}
              width={windowWidth}
              height={windowHeight}
              resize='contain'
            />
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity
          onPress={editProfilePicture}
          >
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button
            title="Sign Out"
            color='#1F2D59'
            onPress={async() => {
              try{
                await signOut(auth);
                navigation.navigate('Login');
              }catch(e){
                Alert.alert(e);
              }
            }}
          />
        </View>
      </View>
    </React.Fragment>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    padding: 20,
    backgroundColor: 'white',
  },

  textTitle: {
    fontSize: 28,
    color: '#1F2D59',
    fontWeight: 'bold',
  },

  profilePictureContainer: {
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 200,
    width: 200,
    height: 200,
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

  edit: {
    color: '#1F2D59',
    fontSize: 24,
  },

  buttonContainer: {
    marginTop: "auto", 
    width: 150,
  },
});

//make this component available to the app
export default EditProfileScreen;
