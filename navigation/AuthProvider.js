import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState } from "react";
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try{
            await signInWithEmailAndPassword(auth, email,password);
          }catch(e){
            Alert.alert('Login error', e.message);
          }
        },
        register: async (email, password) => {
          try{
            await createUserWithEmailAndPassword(auth, email, password);
          }catch(e){
            Alert.alert('Sign up error', e.message);
          }
        },
        logout: async () => {
          try{
            await signOut(auth);
          }catch(e){
            console.log(e);
          }
        },
        forgotPassword: async (email) => {
          try{
            await sendPasswordResetEmail(auth,email);
          }
          catch(e){
            Alert.alert('Reset password error', e.message);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}