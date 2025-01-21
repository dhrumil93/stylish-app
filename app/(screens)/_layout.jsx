import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ScreensLayout() {
  return (
    <>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'slide_from_right',
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
        <Stack.Screen 
          name="shopping-bag/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="payment/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="order-confirmation/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
} 