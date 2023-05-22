//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// create a component
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Home'
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

//make this component available to the app
export default AppStack;
