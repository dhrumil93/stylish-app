import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function ResetPassword() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Add email display
  const maskedEmail = email ? email.replace(/(.{2})(.*)(@.*)/, "$1***$3") : "";

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetPassword = async () => {
    try {
      // Validate inputs
      if (!formData.newPassword || !formData.confirmPassword) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        Alert.alert("Error", "New password and confirm password do not match");
        return;
      }

      if (formData.newPassword.length < 6) {
        Alert.alert("Error", "New password must be at least 6 characters long");
        return;
      }

      setLoading(true);

      // Prepare the request data
      const requestData = {
        email: email.toLowerCase().trim(),
        newPassword: formData.newPassword
      };

      console.log("Request Data:", requestData); // Debug log

      const response = await fetch(
        "https://ecommerce-shop-qg3y.onrender.com/api/user/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        Alert.alert(
          "Success",
          "Password has been reset successfully",
          [{ text: "OK", onPress: () => router.push("/(auth)/signin") }]
        );
      } else {
        Alert.alert("Error", result.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert(
        "Error",
        "Network error or server not responding. Please try again later."
      );
    } finally {
      setLoading(false);
    }
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
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Reset Password</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/6195/6195699.png",
                }}
                style={styles.icon}
              />
            </View>

            {/* Email display */}
            <View style={styles.emailContainer}>
              <Text style={styles.emailLabel}>Reset password for:</Text>
              <Text style={styles.emailText}>{maskedEmail}</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={formData.newPassword}
                    onChangeText={(value) => handleChange("newPassword", value)}
                    placeholder="Enter new password"
                    secureTextEntry={!showNewPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  >
                    <Feather
                      name={showNewPassword ? "eye" : "eye-off"}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm New Password</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={formData.confirmPassword}
                    onChangeText={(value) =>
                      handleChange("confirmPassword", value)
                    }
                    placeholder="Confirm new password"
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Feather
                      name={showConfirmPassword ? "eye" : "eye-off"}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetPassword}
              >
                <Text style={styles.resetButtonText}>Reset Password</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#FFFFFF",
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
    color: "#000000",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFF5F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    alignSelf: "center",
    marginTop: 20,
  },
  icon: {
    width: 64,
    height: 64,
    tintColor: "#F83758",
  },
  formContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    height: 48,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: "#333333",
  },
  resetButton: {
    backgroundColor: "#F83758",
    borderRadius: 8,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#F83758",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  emailContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  emailLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
});
