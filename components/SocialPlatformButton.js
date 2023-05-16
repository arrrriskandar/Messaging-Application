//import liraries
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { windowHeight } from '../utils/Dimensions';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

// create a component
const SocialPlatformButton = ({buttonTitle, buttonType, color, backgroundColor, ...rest}) => {
  let bgColor = backgroundColor;
  return (
    <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: bgColor}]} {...rest}>
      <View style={styles.iconWrapper}>
        <FontAwesome name={buttonType} style={styles.icon} size={22} color={color} />
      </View>
      <View style={styles.buttonTextWrapper}>
        <Text style={[styles.buttonText, {color:color}]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>

  );
};

// define your styles
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight/15,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 3,
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
  buttonTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

//make this component available to the app
export default SocialPlatformButton;
