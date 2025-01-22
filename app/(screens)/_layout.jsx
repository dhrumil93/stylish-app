import React from "react";
import { View, StyleSheet, StatusBar, Platform } from "react-native";
import { Stack, usePathname } from "expo-router";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

const STATUSBAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight : 0;
const HEADER_HEIGHT = 56;

export default function ScreensLayout() {
  const pathname = usePathname();

  // Simpler path check
  const shouldShowNavigation =
    pathname === "/home" ||
    pathname === "/trending" ;
    // || pathname.includes("/product");

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        {shouldShowNavigation && (
          <View style={styles.headerContainer}>
            <View style={styles.statusBarSpace} />
            <Header />
          </View>
        )}
        <View
          style={[
            styles.content,
            !shouldShowNavigation && styles.contentWithoutNav,
            shouldShowNavigation && styles.contentWithNav,
          ]}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
              // animation: "slide_from_right",
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
                animation: "fade",
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
              name="change-password"
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
        </View>
        {shouldShowNavigation && <BottomNavigation />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  statusBarSpace: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: "transparent",
  },
  headerContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentWithoutNav: {
    paddingTop: 0,
  },
  contentWithNav: {
    paddingTop: HEADER_HEIGHT + STATUSBAR_HEIGHT,
  },
});
