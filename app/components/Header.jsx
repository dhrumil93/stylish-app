import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

const HEADER_HEIGHT = 56;
const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/7216/7216128.png",
          }}
          style={[styles.menuIcon, { tintColor: "#000" }]}
        />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/group34010.png")}
          style={styles.logoIcon}
        />
        <Text style={styles.logoText}>Stylo</Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/(screens)/checkout/")}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.profileIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: HEADER_HEIGHT,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    position: 'absolute',
    top: STATUSBAR_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 100,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoIcon: {
    width: 34,
    height: 34,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4392F9",
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
}); 