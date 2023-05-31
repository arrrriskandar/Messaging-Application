import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoardingScreen from '../screens/OnBoardingScreen';
import LoginScreen from '../screens/LoginScreen';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if(value==null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if( isFirstLaunch == null ) {
    return null;
  }else if (isFirstLaunch == true ) {
    routeName = 'OnBoarding'
  }else {
    routeName = 'OnBoarding'
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen 
        name='OnBoarding'
        component={OnBoardingScreen}
        options={{header: () => null}}
      />
      <Stack.Screen 
        name='Login'
        component={LoginScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;