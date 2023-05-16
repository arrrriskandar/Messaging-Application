import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnBoardingScreen = ({navigation}) => {
  return (
    <Onboarding
    onDone={() => navigation.navigate('Login')}
    onSkip={() => navigation.replace('Login')}
      pages={[
        {
          backgroundColor: '#000080',
          image: <Image source={require('../assets/favicon.png')} />,
          title: 'Welcome to Chatter! ',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#0000cc',
          image: <Image source={require('../assets/favicon.png')} />,
          title: 'Onboarding Page 2',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#0000cc',
          image: <Image source={require('../assets/favicon.png')} />,
          title: 'Onboarding Page 3',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  );
}

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});