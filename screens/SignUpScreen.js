import React, { Component, useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialPlatformButton from '../components/SocialPlatformButton';
import { AuthContext } from '../navigation/AuthProvider';

const SignUpScreen = ({navigation}) => {
  const {register, fbLogin, googleLogin} = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isTappedPassword, setIsTappedPassword] =useState(false);
  const [isTappedConfirmPassword, setIsTappedConfirmPassword] =useState(false);
  return (
      <View style={styles.container}>
        <Text style={styles.text}>Create an account</Text>
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
        onBlur={() => setIsTappedPassword(true)}
      />
      {isTappedPassword && password.match('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$') === null && (
        <Text style={styles.errorText}>Password must contain minumum 8 characters, at least one uppercase letter, one lowercase letter, one digit and one special character</Text>
      )}
      <FormInput 
        labelValue={confirmPassword}
        onChangeText={(userConfirmPassword) => setConfirmPassword(userConfirmPassword)}
        placeholderText='Confirm Password'
        iconType='lock'
        secureTextEntry={true}
        onBlur={() => setIsTappedConfirmPassword(true)}
      />
      {isTappedConfirmPassword && password!==confirmPassword && (
        <Text style={styles.errorText}>Your passwords do not match</Text>
      )}
      <FormButton 
        buttonTitle='Sign Up'
        disabled={password!==confirmPassword}
        onPress= {() => register(email,password)}
      />
      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>By registering, you confirm that you accept our </Text>
        <TouchableOpacity onPress={() => alert('T&S clicked')}>
          <Text style={[styles.color_textPrivate, {color:'#e88832'}]}>Terms of service </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}>and </Text>
        <TouchableOpacity onPress={() => alert('P&P clicked')}>
          <Text style={[styles.color_textPrivate, {color:'#e88832'}]}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
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
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    color: 'grey',
  },
  errorText: {
    fontSize: 12,
    color: '#FF0D10',
  }
});

export default SignUpScreen;