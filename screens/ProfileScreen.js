//import liraries
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { pickImage, askForPermission } from '../utils/ImageSelect';
import { uploadImage } from '../utils/ImageUpload';
import { auth, database } from '../config/firebase';
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

// create a component
const ProfileScreen = ({navigation}) => {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  async function handlePress() {
    const user = auth.currentUser;
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }
    const userData = {
      displayName,
      phoneNumber: user.phoneNumber,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }

    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(database, "users", user.uid), { ...userData, uid: user.uid }),
    ]);
    navigation.navigate('Home');
  }

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }

  if (!permissionStatus) {
    return <Text>Loading</Text>;
  }
  if (permissionStatus !== "granted") {
    return <Text>You need to allow this permission</Text>;
  }
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          Profile Info
        </Text>
        <Text style={styles.textHint}>
          Please provide your name and an optional profile photo
        </Text>
        <TouchableOpacity
          onPress={handleProfilePicture}
          style={styles.profilePictureContainer}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons
              name="camera-plus"
              color='#1F2D59'
              size={45}
            />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={styles.profilePicture}
            />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Type your name"
          placeholderTextColor='white'
          value={displayName}
          onChangeText={setDisplayName}
          style={styles.textDisplayName}
          returnKeyType='done'
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            color='white'
            onPress={handlePress}
            disabled={!displayName}
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
    backgroundColor: '#1F2D59',
  },

  textTitle: {
    fontSize: 22,
    color: 'white',
  },

  textHint: {
    fontSize: 14, 
    marginTop: 20,
    color: 'white',
  },
  profilePictureContainer: {
    marginTop: 30,
    borderRadius: 120,
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
  },

  profilePicture: {
    width: "100%", 
    height: "100%", 
    borderRadius: 120,
  },

  textDisplayName: {
    marginTop: 60,
    borderBottomWidth: 2,
    width: "60%",
    borderBottomColor: 'white',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    paddingBottom: 10,
  },

  buttonContainer: {
    marginTop: "auto", 
    width: 80,
  },
});

export default ProfileScreen;
