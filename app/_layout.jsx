import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="(screens)"
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
