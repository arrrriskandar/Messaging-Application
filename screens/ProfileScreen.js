import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { Alert } from 'react-native';
import ProfilePicture from '../components/ProfilePicture';

// create a component
const ProfileScreen = ({navigation}) => {
  const user = auth.currentUser;
  const [modalVisible, setModalVisible] = useState(false);

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
              width='100%'
              height='100%'
              resize='contain'
            />
          </TouchableOpacity>
        </Modal>
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

  buttonContainer: {
    marginTop: "auto", 
    width: 150,
  },
});

export default ProfileScreen;
