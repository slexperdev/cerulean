import React from 'react';
import {Image, StyleSheet, Button, Text} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.replace('Login')}
      bottomBarColor="#fff"
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={styles.img}
              source={require('../assets/2992779.jpg')}
            />
          ),
          title: 'Connect to with Creulean',
          subtitle: 'A new way to connect with th world',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={styles.img}
              source={require('../assets/3527178.jpg')}
            />
          ),
          title: 'Share Your Favorites Us',
          subtitle: 'Share your things with similar kind of people',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 200,
  },
});
