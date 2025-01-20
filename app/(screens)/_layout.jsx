import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="splash"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="onboarding"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="welcome"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="trending/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="checkout/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="product/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="cart/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 