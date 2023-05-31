import React, { useContext, useState, useRef } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider } from 'firebase/auth';
import { firebaseConfig } from '../config/firebase';
import { auth } from '../config/firebase';
import CountryPicker from 'react-native-country-picker-modal';



const LoginScreen = () => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();

  const [message, showMessage] = useState();
  const attemptInvisibleVerification = false;
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [completePhoneNumber, setCompletePhoneNumber] = useState();
  const [countryCode, setCountryCode] = useState('')

  const{login} = useContext(AuthContext);
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Image
        source={require('../assets/logo-color.png')}
        style={styles.logo}
      />
      <CountryPicker
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
        visible
        translation="eng"
        placeholder="Country code"
      />
      <TextInput
        style={styles.textInput}
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(number) => {
          setPhoneNumber(number);
        }}
        placeholder='Enter phone number'
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber || !countryCode}
        onPress={async () => {
          try {
            const fullPhoneNumber = `+${selectedCountry.callingCode[0]} ${phoneNumber}`;
            setCompletePhoneNumber(fullPhoneNumber);
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              completePhoneNumber,
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
        onChangeText={setVerificationCode}
        placeholder='Enter verification code'
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress= {() => login(verificationId, verificationCode)}
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
              color: message.color || 'white',
              fontSize: 17,
              textAlign: 'center',
              margin: 20,
            }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1F2D59'
  },
  logo: {
    height: 300,
    width: 300,
    resizeMode: 'cover',
  },
  textInput: {
    marginVertical: 10, 
    fontSize: 17,
    textAlign: 'center',
    color: '#000',
    backgroundColor: 'white',
    width: 200,
    height: 25,
    borderRadius: 5
  },
  countryPicker: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 30,
    backgroundColor: 'white',
    borderRadius: 5
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    color: 'green',
  }
});

//make this component available to the app
export default LoginScreen;