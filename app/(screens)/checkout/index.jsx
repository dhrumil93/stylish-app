import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function Checkout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Add state for all form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    dateOfBirth: "",
    password: "••••••••••",
    pincode: "",
    address: "",
    city: "",
    state: "",
    country: "",
    bankAccount: "",
    accountHolder: "",
    ifscCode: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        "https://ecommerce-shop-qg3y.onrender.com/api/user/profileDisplay",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any required authorization headers
          },
        }
      );

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok && result.success) {
        // Update form data with API response
        setFormData(prevData => ({
          ...prevData,
          name: result.data.firstName || "",
          email: result.data.email || "",
          mobile: result.data.mobile || "",
          gender: result.data.gender || "",
        }));
      } else {
        Alert.alert("Error", "Failed to fetch profile data");
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert(
        "Error", 
        "Network error or server not responding. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F83758" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={[styles.safeArea, {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }]}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile Details</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editProfileButton}>
                <Feather name="edit" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>

            {/* Personal Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Details</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(value) => handleChange("name", value)}
                  placeholder="Enter name"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={[styles.input, styles.disabledInput]}
                  value={formData.email}
                  editable={false}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  value={formData.mobile}
                  onChangeText={(value) => handleChange("mobile", value)}
                  keyboardType="numeric"
                  maxLength={10}
                  placeholder="Enter mobile number"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <TextInput
                  style={styles.input}
                  value={formData.gender}
                  onChangeText={(value) => handleChange("gender", value)}
                  placeholder="Enter gender"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={formData.password}
                    editable={false}
                    secureTextEntry
                  />
                  <TouchableOpacity>
                    <Text style={styles.changePassword}>Change Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Address Details
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Address Details</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Pincode</Text>
                <TextInput
                  style={styles.input}
                  value={formData.pincode}
                  onChangeText={(value) => handleChange("pincode", value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  value={formData.address}
                  onChangeText={(value) => handleChange("address", value)}
                  multiline
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.input}
                  value={formData.city}
                  onChangeText={(value) => handleChange("city", value)}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>State</Text>
                <TextInput
                  style={styles.input}
                  value={formData.state}
                  onChangeText={(value) => handleChange("state", value)}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Country</Text>
                <TextInput
                  style={styles.input}
                  value={formData.country}
                  onChangeText={(value) => handleChange("country", value)}
                />
              </View>
            </View>

            {/* Bank Account Details */}
            {/* <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bank Account Details</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Bank Account Number</Text>
                <TextInput
                  style={styles.input}
                  value={formData.bankAccount}
                  onChangeText={(value) => handleChange("bankAccount", value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Account Holder's Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.accountHolder}
                  onChangeText={(value) => handleChange("accountHolder", value)}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>IFSC Code</Text>
                <TextInput
                  style={styles.input}
                  value={formData.ifscCode}
                  onChangeText={(value) => handleChange("ifscCode", value)}
                />
              </View>
            </View> */}

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
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
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 24,
    position: "relative",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F5F5",
    resizeMode: "cover",
  },
  editProfileButton: {
    position: "absolute",
    bottom: 0,
    right: "42%",
    backgroundColor: "#F83758",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
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
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#FFFFFF",
  },
  passwordContainer: {
    position: "relative",
  },
  changePassword: {
    position: "absolute",
    right: 12,
    top: -35,
    color: "#F83758",
    fontSize: 14,
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: "#F83758",
    marginHorizontal: 16,
    marginVertical: 18,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#F83758",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledInput: {
    backgroundColor: "#F5F5F5",
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
