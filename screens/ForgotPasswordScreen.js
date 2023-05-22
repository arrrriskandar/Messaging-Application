import React, { Component, useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialPlatformButton from '../components/SocialPlatformButton';
import { AuthContext } from '../navigation/AuthProvider';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const{forgotPassword} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <FormInput 
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText='Email'
        iconType='user'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
      />
      <FormButton 
        buttonTitle='Reset Password'
        onPress={() => {
          forgotPassword(email)
          Alert.alert('Reset email sent! Please check your email on how to reset your password.');
          navigation.navigate('Login')
          }
        }
      />
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
  forgotButton: {
    marginVertical: 35,
  },
});

//make this component available to the app
export default ForgotPasswordScreen;