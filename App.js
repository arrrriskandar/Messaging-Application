import ContextWrapper from "./context/ContextWrapper";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from "./screens/OnBoardingScreen";
import LoginScreen from './screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import ProfileSetUpScreen from './screens/ProfileSetUpScreen';
import { LogBox, Text } from 'react-native'
import ContactsScreen from "./screens/ContactsScreen";
import ChatScreen from "./screens/ChatScreen";
import ChatHeader from './components/ChatHeader';
import { HeaderBackButton } from '@react-navigation/elements';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

LogBox.ignoreLogs([  
  'Constants.platform.ios.model has been deprecated in favor of expo-device\'s Device.modelName property. This API will be removed in SDK 45.',
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
])
const Stack = createNativeStackNavigator();

const App = () => {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setCurrUser(user);
    });
    return () => unsubscribe();
  }, []);

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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if( isFirstLaunch == null ) {
    return null;
  }else if (isFirstLaunch == true ) {
    routeName = 'OnBoarding'
  }else {
    routeName = 'Login'
  }

  return (
    <NavigationContainer>
      {!currUser ? (
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
      )
     : (
      <Stack.Navigator>
        {!currUser.displayName && 
          <Stack.Screen 
          name='ProfileSetUp'
          component={ProfileSetUpScreen}
          options={{header: () => null}}
        />
        }
        <Stack.Screen 
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Chatter',
            headerStyle: {
              backgroundColor: '#1F2D59',
            },
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerLeft: null,
            }}
        />
        <Stack.Screen
          name='Contacts'
          component={ContactsScreen}
          options={{
            title: 'Select contact',
            headerStyle: {
              backgroundColor: '#1F2D59',
            },
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerBackTitleVisible: false
          }}
        />
        <Stack.Screen
          name='Chat'
          component={ChatScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1F2D59',
            },
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerTitle: (props) => 
            <ChatHeader {...props} />,
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.navigate('Home')}
                tintColor="white"
              />
            ),
          })}
        />
      </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function Main() {
  return (
    <ActionSheetProvider>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </ActionSheetProvider>
  );
}

export default Main;