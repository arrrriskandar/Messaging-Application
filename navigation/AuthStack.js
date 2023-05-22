import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoardingScreen from '../screens/OnBoardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      <Stack.Screen 
        name='SignUp'
        component={SignUpScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={({navigation}) => ({
          title: 'Reset Password',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button 
                name="long-arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;