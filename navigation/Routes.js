import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Routes = () => {

  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChange = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth,onAuthStateChange);
    return subscriber;
  }, []);

  if(initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack/>}
    </NavigationContainer>
  );
};

export default Routes;