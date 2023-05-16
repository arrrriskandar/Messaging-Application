import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoardingScreen from './screens/OnBoardingScreen';
import LoginScreen from './screens/LoginScreen';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppStack = createNativeStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
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
    return (
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen
            name='OnBoarding'
            component={OnBoardingScreen}
            options={{ headerShown: false }} // Hide the header for OnBoardingScreen
          />
          <AppStack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }} // Hide the header for LoginScreen
          />
        </AppStack.Navigator>
      </NavigationContainer>
    )
  }else {
    return (
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen
            name='OnBoarding'
            component={OnBoardingScreen}
            options={{ headerShown: false }} // Hide the header for OnBoardingScreen
          />
          <AppStack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }} // Hide the header for LoginScreen
          />
        </AppStack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;