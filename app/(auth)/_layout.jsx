import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="signin"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="signup"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="forgot-password"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="reset-password"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 