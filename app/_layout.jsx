import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'none'
      }}
      initialRouteName="(screens)/splash"
    >
      <Stack.Screen 
        name="(screens)/splash" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
