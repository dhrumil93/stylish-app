import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, StatusBar, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

const { width } = Dimensions.get('window');

export default function Splash() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(async () => {
      try {
        await SplashScreen.hideAsync();
        router.push('/(screens)/onboarding');
      } catch (error) {
        console.log('Error navigating:', error);
      }
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={[styles.container, {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }]}>
        <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
          <Image 
            source={require('../../assets/images/group34010.png')}
            style={styles.logoIcon}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>Stylo</Text>
        </Animated.View>
      </View>
    </>
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
    fontSize: 18,
    fontWeight: "600",
    color: "#4392F9",
  },
});