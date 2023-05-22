import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const{login} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-black.png')}
        style={styles.logo}
      />
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
        onPress= {() => login(email,password)}
      />
      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
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
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    height: 250,
    width: 250,
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