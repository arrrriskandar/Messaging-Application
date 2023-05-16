import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialPlatformButton from '../components/SocialPlatformButton';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Messaging App</Text>
      <FormInput 
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText='Email'
        iconType='user'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
      />
      <FormInput 
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText='Password'
        iconType='lock'
        secureTextEntry={true}
      />
      <FormButton 
        buttonTitle='Sign In'
        onPress= {() => alert('Sign in clicked')}
      />
      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
      <SocialPlatformButton 
        buttonTitle='Sign In with Facebook'
        buttonType='facebook'
        color= '#4867aa'
        backgroundColor= '#e6eaf4'
        onPress={() => {}}
      />
      <SocialPlatformButton 
        buttonTitle='Sign In with Google'
        buttonType='google'
        color= '#de4d41'
        backgroundColor= '#f5e7ea'
        onPress={() => {}}
      />
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.navButtonText}>Don't have an account? Create here!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5'
  }
});

//make this component available to the app
export default LoginScreen;