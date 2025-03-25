import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import AuthService from '../services/AuthService';
import NotificationService from '../services/NotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize notifications when the screen loads
    NotificationService.registerForPushNotifications();
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      // Register for push notifications and get token
      const pushToken = await NotificationService.registerForPushNotifications();
      console.log('Push Token for this device:', pushToken);

      const response = await fetch(
        "https://ecommerce-shop-qg3y.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.toLowerCase().trim(),
            password: password,
            device_token: pushToken
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success && result.data) {
        await AsyncStorage.setItem('userToken', result.data);
        router.replace("/(screens)/home");
      } else {
        Alert.alert("Error", result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Welcome{"\n"}Back!</Text>
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
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.passwordContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/3064/3064155.png",
            }}
            style={[styles.inputIcon, { tintColor: "#666" }]}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#666"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={{
                uri: showPassword
                  ? "https://cdn-icons-png.flaticon.com/128/2767/2767146.png"
                  : "https://cdn-icons-png.flaticon.com/128/2767/2767194.png",
              }}
              style={[styles.eyeIcon, { tintColor: "#666" }]}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.forgotPasswordButton}
          onPress={() => router.push("/(auth)/forgot-password")}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.signInButton,
            (!email || !password) && styles.signInButtonDisabled,
          ]}
          onPress={handleSignIn}
          disabled={!email || !password || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.signInButtonText}>Sign In</Text>
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

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Create An Account </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.signupText}>Email : dhrumilpatel0093@gmail.com</Text>
        <Text style={styles.signupText}>Password : 1234567 </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    marginTop:56,
    marginBottom: 40,
    marginLeft:"32px"
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#000",
    lineHeight: 43,
    fontFamily: "Montserrat",
  },
  form: {
    flex: 1,
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
  eyeIcon: {
    width: 24,
    height: 24,
    opacity: 0.5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 15,
    height: 55,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#F83758',
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: "#FF4B6E",
    borderRadius: 4,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  signInButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  signInButtonText: {
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
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    width: 56,
    height: 56,
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
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#666",
    fontSize: 14,
  },
  signupLink: {
    color: "#FF4B6E",
    fontWeight: "600",
    fontSize: 14,
  },
});
