//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

// create a component
const HomeScreen = () => {
  const {logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <FormButton buttonTitle='Logout' onPress={() => logout()} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});

//make this component available to the app
export default HomeScreen;
