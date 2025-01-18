import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function Checkout() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image 
              source={{ 
                uri: 'https://cdn-icons-png.flaticon.com/512/2732/2732652.png'
              }}
              style={[styles.backIcon, { tintColor: '#000' }]}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              source={
                require("../../../assets/images/profile.png")
              }
              style={styles.profileImage}
            />
            <View style={styles.verifiedBadge}>
              <Image 
                source={{ 
                  uri: 'https://cdn-icons-png.flaticon.com/512/7595/7595571.png'
                }}
                style={[styles.verifiedIcon, { tintColor: '#4392F9' }]}
              />
            </View>
          </View>

          {/* Personal Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value="aashifa@gmail.com"
                editable={false}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  value="••••••••••"
                  editable={false}
                  secureTextEntry
                />
                <TouchableOpacity>
                  <Text style={styles.changePassword}>Change Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Business Address Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Address Details</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                style={styles.input}
                value="450116"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                value="216 St Paul's Rd,"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                value="London"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={styles.input}
                value="N1 2LL,"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                value="United Kingdom"
              />
            </View>
          </View>

          {/* Bank Account Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bank Account Details</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bank Account Number</Text>
              <TextInput
                style={styles.input}
                value="204356XXXXXXX"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Account Holder's Name</Text>
              <TextInput
                style={styles.input}
                value="Abhiraj Sisodiya"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>IFSC Code</Text>
              <TextInput
                style={styles.input}
                value="SBIN00428"
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 24,
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    resizeMode: 'cover',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: '42%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    position: 'relative',
  },
  changePassword: {
    position: 'absolute',
    right: 12,
    top: -35,
    color: '#F83758',
    fontSize: 14,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#F83758',
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#F83758',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  verifiedIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
}); 