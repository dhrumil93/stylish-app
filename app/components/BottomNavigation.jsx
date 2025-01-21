import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get('window');
const BOTTOM_NAV_HEIGHT = 65;

const MENU_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: (color) => <AntDesign name="home" size={24} color={color} />,
    route: "/(screens)/home",
  },
  {
    id: 'trending',
    label: 'Trending',
    icon: (color) => <AntDesign name="hearto" size={24} color={color} />,
    route: "/(screens)/trending",
  },
  {
    id: 'cart',
    label: '',
    icon: (color) => (
      <View style={styles.cartIconContainer}>
        <Feather name="shopping-cart" size={24} color="#FFFFFF" />
      </View>
    ),
    route: "/(screens)/cart",
    isSpecial: true,
  },
  {
    id: 'search',
    label: 'Search',
    icon: (color) => <Feather name="search" size={24} color={color} />,
    route: "/(screens)/search",
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (color) => <Ionicons name="settings-outline" size={24} color={color} />,
    route: "/(screens)/settings",
  },
];

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);

  const handlePress = (route) => {
    setActiveTab(route);
    router.push(route);
  };

  const getColor = (route) => {
    return activeTab === route ? "#FF4B6E" : "#000000";
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomNav}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.navItem,
              item.isSpecial && styles.cartButton
            ]}
            onPress={() => handlePress(item.route)}
          >
            {item.icon(getColor(item.route))}
            {!item.isSpecial && (
              <Text
                style={[
                  styles.navText,
                  activeTab === item.route && styles.activeNavText,
                ]}
              >
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: BOTTOM_NAV_HEIGHT,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    height: BOTTOM_NAV_HEIGHT,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  cartButton: {
    // marginTop: -20,
  },
  cartIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF4B6E",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // elevation: 8,
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  activeNavText: {
    color: "#FF4B6E",
  },
}); 