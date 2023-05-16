import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoardingScreen from './screens/OnBoardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
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
            options={{ headerShown: false }} 
          />
          <AppStack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }} 
          />
          <AppStack.Screen
            name='SignUp'
            component={SignUpScreen}
            options={({navigation}) => ({
              title: '',
              headerStyle: {
                backgroundColor: '#f9fafd',
                borderBottomWidth: 0,
              },
              headerTitleStyle: {
                borderBottomWidth: 0,
              },
            })}
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
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }} 
          />
          <AppStack.Screen
            name='SignUp'
            component={SignUpScreen}
            options={({navigation}) => ({
              title: '',
              headerStyle: {
                backgroundColor: '#f9fafd',
                borderBottomWidth: 0,
              },
              headerTitleStyle: {
                borderBottomWidth: 0,
              },
            })}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;