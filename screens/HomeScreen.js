import ChatsScreen from "./ChatsScreen";
import ProfileScreen from "./ProfileScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Chats') {
            iconName = 'chat';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return (
            <MaterialIcons
              name={iconName}
              size={focused ? 24 : 20}
              color={focused ? 'white' : color}
            />
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#1F2D59' },
        tabBarIndicatorStyle: {backgroundColor: 'white'},
      })}
      >
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          }} 
        />
      <Tab.Screen 
        name="Chats" 
        component={ChatsScreen} 
        options={{
          tabBarShowLabel: false,
          }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
