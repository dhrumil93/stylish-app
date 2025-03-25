import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

export default function Settings() {
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('userToken');
            router.push('/(auth)/signin');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: <AntDesign name="user" size={24} color="#666" />,
          label: 'Profile Information',
          onPress: () => router.push('/(screens)/checkout'),
        },
        // {
        //   icon: <MaterialIcons name="location-on" size={24} color="#666" />,
        //   label: 'Saved Addresses',
        //   onPress: () => router.push('/(screens)/addresses'),
        // },
        {
          icon: <AntDesign name="creditcard" size={24} color="#666" />,
          label: 'Payment Methods',
          // onPress: () => router.push('/(screens)/payment-methods'),
        },
      ],
    },
    {
      title: 'Shopping',
      items: [
        {
          icon: <AntDesign name="hearto" size={24} color="#666" />,
          label: 'My Wishlist',
          // onPress: () => router.push('/(screens)/wishlist'),
        },
        {
          icon: <AntDesign name="profile" size={24} color="#666" />,
          label: 'Order History',
          onPress: () => router.push('/(screens)/orders'),
        },
        {
          icon: <MaterialIcons name="local-offer" size={24} color="#666" />,
          label: 'Offers & Coupons',
          // onPress: () => router.push('/(screens)/offers'),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: <Ionicons name="notifications-outline" size={24} color="#666" />,
          label: 'Notifications',
          // onPress: () => router.push('/(screens)/notification-test'),
        },
        {
          icon: <Feather name="lock" size={24} color="#666" />,
          label: 'Change Password',
          onPress: () => router.push('/(screens)/change-password'),
        },
      ],
    },
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>

          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {settingsSections.map((section, sectionIndex) => (
              <View key={section.title} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.sectionContent}>
                  {section.items.map((item, itemIndex) => (
                    <TouchableOpacity
                      key={item.label}
                      style={[
                        styles.settingItem,
                        itemIndex === section.items.length - 1 && styles.lastItem,
                      ]}
                      onPress={item.onPress}
                    >
                      <View style={styles.settingItemLeft}>
                        {item.icon}
                        <Text style={styles.settingItemLabel}>{item.label}</Text>
                      </View>
                      <AntDesign name="right" size={20} color="#666" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <AntDesign name="logout" size={24} color="#F83758" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingItemLabel: {
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFF0F3',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F83758',
  },
}); 