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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Checkout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Add state for all form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    password: "••••••••••",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert("Error", "Please login to view profile");
        router.push("/(auth)/signin");
        return;
      }

      const response = await fetch(
        `https://ecommerce-shop-qg3y.onrender.com/api/user/profileDisplay`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.success && result.data) {
        // Update form data with API response
        const updatedData = {
          ...formData,
          name: result.data.name || "",
          email: result.data.email || "",
          mobile: result.data.mobile?.toString() || "",
          gender: result.data.gender ? result.data.gender.toString() : "",
          password: "••••••••••"
        };
        setFormData(updatedData);
      } else {
        if (response.status === 401) {
          await AsyncStorage.removeItem('userToken');
          Alert.alert("Session Expired", "Please login again");
          router.push("/(auth)/signin");
        } else {
          Alert.alert("Error", "Failed to fetch profile data");
        }
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

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert("Error", "Please login to update profile");
        router.push("/(auth)/signin");
        return;
      }

      // Only send fields that have been changed
      const updateData = {};
      if (formData.name && formData.name.trim() !== "") {
        updateData.name = formData.name.trim();
      }
      if (formData.gender) {
        updateData.gender = formData.gender;
      }

      // Only include mobile if it's changed and valid
      if (formData.mobile && formData.mobile.trim() !== "") {
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
          Alert.alert("Error", "Please enter a valid 10-digit mobile number");
          setLoading(false);
          return;
        }
      }

      const response = await fetch(
        `https://ecommerce-shop-qg3y.onrender.com/api/user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();
      console.log('Update Response:', result);

      if (response.ok && result.success) {
        Alert.alert(
          "Success", 
          "Profile updated successfully",
          [{ text: "OK", onPress: () => fetchUserProfile() }] // Refresh the profile data
        );
      } else {
        if (response.status === 401) {
          await AsyncStorage.removeItem('userToken');
          Alert.alert("Session Expired", "Please login again");
          router.push("/(auth)/signin");
        } else {
          Alert.alert("Error", result.message || "Failed to update profile");
        }
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

  const handleGenderSelect = (selectedGender) => {
    setFormData(prev => ({
      ...prev,
      gender: selectedGender
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

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
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
                  placeholder="Enter mobile number"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.radioGroup}>
                  <TouchableOpacity 
                    style={styles.radioOption} 
                    onPress={() => handleGenderSelect("Male")}
                  >
                    <View style={styles.radioButton}>
                      {formData.gender?.toLowerCase() === "male" && <View style={styles.radioButtonSelected} />}
                    </View>
                    <Text style={styles.radioLabel}>Male</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.radioOption} 
                    onPress={() => handleGenderSelect("Female")}
                  >
                    <View style={styles.radioButton}>
                      {formData.gender?.toLowerCase() === "female" && <View style={styles.radioButtonSelected} />}
                    </View>
                    <Text style={styles.radioLabel}>Female</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.radioOption} 
                    onPress={() => handleGenderSelect("Other")}
                  >
                    <View style={styles.radioButton}>
                      {formData.gender?.toLowerCase() === "other" && <View style={styles.radioButtonSelected} />}
                    </View>
                    <Text style={styles.radioLabel}>Other</Text>
                  </TouchableOpacity>
                </View>
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
                  <TouchableOpacity onPress={() => router.push("/(screens)/change-password")}>
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
          </ScrollView>

          {/* Save Button Container - Outside ScrollView */}
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
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
    paddingVertical: 2,
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
    marginBottom: 8,
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
    right: 2,
    top: -42,
    color: "#F83758",
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  saveButtonContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  saveButton: {
    backgroundColor: "#F83758",
    paddingVertical: 16,
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
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 24,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF4B6E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF4B6E',
  },
  radioLabel: {
    fontSize: 14,
    color: '#000',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
