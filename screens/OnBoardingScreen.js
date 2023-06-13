import { Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnBoardingScreen = ({navigation}) => {
  return (
    <Onboarding
    onDone={() => navigation.navigate('Login')}
    onSkip={() => navigation.replace('Login')}
      pages={[
        {
          backgroundColor: '#1F2D59',
          image: <Image source={require('../assets/logo-color.png')} style={{ width: 300, height: 300}} />,
          title: 'Welcome to Chatter! ',
          subtitle: 'Connecting people around the world.',
        },
        {
          backgroundColor: '#1F2D59',
          image: <Image source={require('../assets/instant-messaging.png')} style={{ width: 250, height: 250}} />,
          title: 'Enjoy instant communication',
          subtitle: 'Stay connected with friends, family, and colleagues in real-time.',
        },
        {
          backgroundColor: '#1F2D59',
          image: <Image source={require('../assets/camera.png')} style={{ width: 250, height:250 }} />,
          title: 'Seemless photo sharing',
          subtitle: 'Share moments through photos within Chatter with the people who matter most to you.',
        },
      ]}
    />
  );
}

export default OnBoardingScreen;
