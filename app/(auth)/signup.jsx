import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const STATUSBAR_HEIGHT = Platform.OS === "android" ? StatusBar.currentHeight : 0;

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    gender: "",
  });
  const genderOptions = ["Male", "Female", "Other"];
  const router = useRouter();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignUp = async () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.password || !formData.mobile) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Validate mobile number
    if (formData.mobile.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit mobile number");
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const apiData = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        mobile: formData.mobile.replace(/\D/g, ''),
        gender: formData.gender ? formData.gender.toLowerCase().trim() : null,
      };

      console.log('Sending data to API:', apiData);

      const response = await fetch(
        "https://ecommerce-shop-qg3y.onrender.com/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok && result.success) {
        Alert.alert(
          "Success",
          "Account created successfully!",
          [{ text: "OK", onPress: () => router.push("/(auth)/signin") }]
        );
      } else {
        const errorMessage = result.message || "Registration failed. Please try again.";
        Alert.alert("Error", errorMessage);
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

  return (
    <View style={styles.container}>
      <ExpoStatusBar style="dark" />
      <View style={styles.statusBarSpace} />
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create an{"\n"}account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
              }}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              autoCapitalize="words"
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/542/542638.png"
              }}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email *"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/159/159832.png"
              }}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number *"
              keyboardType="numeric"
              maxLength={10}
              value={formData.mobile}
              onChangeText={(value) => handleChange("mobile", value)}
            />
          </View>
          <View style={styles.genderContainer}>
            <Text style={styles.genderLabel}>Gender:</Text>
            <View style={styles.radioGroup}>
              {genderOptions.map((option) => (
                <Pressable
                  key={option}
                  style={styles.radioButton}
                  onPress={() => handleChange("gender", option)}
                >
                  <View style={styles.radio}>
                    {formData.gender === option && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/3064/3064155.png"
              }}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password *"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              secureTextEntry={!showPassword}
              placeholderTextColor="#666"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={{
                  uri: showPassword 
                    ? "https://cdn-icons-png.flaticon.com/128/2767/2767146.png"
                    : "https://cdn-icons-png.flaticon.com/128/2767/2767194.png"
                }}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/3064/3064155.png"
              }}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password *"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#666"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Image
                source={{
                  uri: showConfirmPassword 
                    ? "https://cdn-icons-png.flaticon.com/128/2767/2767146.png"
                    : "https://cdn-icons-png.flaticon.com/128/2767/2767194.png"
                }}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.termsText}>
            By clicking the <Text style={styles.highlightText}>Register</Text>{" "}
            button, you agree{"\n"}
            to the public offer
          </Text>

          <TouchableOpacity
            style={styles.createButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.createButtonText}>Register</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.orText}>- OR Continue with -</Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/300/300221.png"
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/0/747.png"
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>I Already Have an Account </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/signin")}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  statusBarSpace: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#000",
    lineHeight: 43,
    fontFamily: "Montserrat",
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 15,
    height: 55,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#666",
  },
  input: {
    flex: 1,
    height: 55,
    color: "#000",
    fontSize: 14,
  },
  genderContainer: {
    marginBottom: 16,
  },
  genderLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: "row",
    gap: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF4B6E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF4B6E",
  },
  radioLabel: {
    fontSize: 14,
    color: "#666",
  },
  eyeIcon: {
    width: 24,
    height: 24,
    opacity: 0.5,
  },
  termsText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  highlightText: {
    color: "#FF4B6E",
    fontWeight: "600",
  },
  createButton: {
    backgroundColor: "#FF4B6E",
    borderRadius: 4,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  orText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 30,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#FF4B6E",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#FF4B6E",
    fontWeight: "600",
    fontSize: 14,
  },
});
