import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

const { width } = Dimensions.get('window');

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync(); // Hide the native splash screen
      router.replace('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/Group 34010.png')}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Image 
          source={require('../../assets/images/Stylish.png')}
          style={styles.logoText}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 20,
  },
  logoText: {
    width: width * 0.5,
    height: width * 0.15,
  }
});