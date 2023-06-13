import React, { useState, useRef } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, Button, Platform, ScrollView } from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebaseConfig } from '../config/firebase';
import { auth } from '../config/firebase';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';


const LoginScreen = () => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();

  const [message, showMessage] = useState();
  const attemptInvisibleVerification = false;
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryCode, setCountryCode] = useState('');
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Image
          source={require('../assets/logo-color.png')}
          style={styles.logo}
        />
        <CountryPicker
          theme={DARK_THEME}
          withFilter
          withFlag
          withCountryNameButton
          withCallingCode
          withCallingCodeButton
          countryCode={countryCode}
          onSelect={(country) => {
            setSelectedCountry(country)
            setCountryCode(country.cca2)
          }}
          containerButtonStyle={styles.countryPicker}
          translation="eng"
          placeholder='Select country code'
        />
        <TextInput
          style={styles.textInput}
          autoCompleteType="tel"
          keyboardType="numeric"
          textContentType="telephoneNumber"
          onChangeText={setPhoneNumber}
          placeholder='Enter phone number'
          placeholderTextColor='white'
        />
        <Button
          title="Send Verification Code"
          disabled={!phoneNumber || !countryCode}
          onPress={async () => {
            try {
              const phoneProvider = new PhoneAuthProvider(auth);
              const verificationId = await phoneProvider.verifyPhoneNumber(
                `+${selectedCountry.callingCode[0]} ${phoneNumber}`,
                recaptchaVerifier.current
              );
              setVerificationId(verificationId);
              showMessage({
                text: 'Verification code has been sent to your phone.',
              });
            } catch (e) {
              showMessage({ text: `Error: ${e.message}`, color: 'red' });
            }
          }}
        />
        <TextInput
          style={styles.textInput}
          editable={!!verificationId}
          keyboardType="numeric"
          onChangeText={setVerificationCode}
          placeholder='Enter verification code'
          placeholderTextColor='white'
        />
        <Button
          title="Confirm Verification Code"
          disabled={!verificationId}
          onPress= {async() => {
            try {
              const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
              await signInWithCredential(auth, credential);
            } catch (e) {
              showMessage({ text: `Error: ${e.message}`, color: 'red' });
            }
          }}
        />
        {message ? (
          <TouchableOpacity
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 0xffffffee, justifyContent: 'center' },
            ]}
            onPress={() => showMessage(undefined)}>
            <Text
              style={{
                color: message.color || '#1F2D59',
                fontSize: 17,
                textAlign: 'center',
                margin: 20,
              }}>
              {message.text}
            </Text>
          </TouchableOpacity>
        ) : undefined}
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2D59',
  },
  contentContainer: {
    flexGrow:1,
    alignItems: 'center', 
  },
  logo: {
    height: 400,
    width: 400,
    resizeMode: 'cover',
  },
  countryPicker: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    fontSize: 30,
    borderRadius: 12,
    borderColor: 'white',
    borderWidth: 2,
  },
  textInput: {
    marginVertical: 10, 
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    width: '60%',
    height: 40,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
});

export default LoginScreen;