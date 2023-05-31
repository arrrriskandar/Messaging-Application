import React, { createContext, useState } from "react";
import { auth } from '../config/firebase';
import { signOut, signInWithCredential, PhoneAuthProvider } from "firebase/auth";
import { Alert } from "react-native";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (verificationId,verificationCode) => {
          try {
            const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
            await signInWithCredential(auth, credential);
          } catch (e) {
            Alert.alert(e)
          }
        },
        logout: async () => {
          try{
            await signOut(auth);
          }catch(e){
            Alert.alert(e)
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}