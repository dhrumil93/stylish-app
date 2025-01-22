import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    router.push({
      pathname: "/(auth)/reset-password",
      params: { email: email.toLowerCase().trim() },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Forgot{"\n"}password?</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Image
            source={{uri: "https://cdn-icons-png.flaticon.com/128/542/542638.png"}}
            style={styles.emailIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#666"
          />
        </View>

        <Text style={styles.infoText}>
          <Text style={styles.asterisk}>* </Text>
          Enter your email to reset your password
        </Text>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Continue</Text>
        </TouchableOpacity>
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
    marginTop: 56,
    marginBottom: 40,
    marginLeft: 32,
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
  input: {
    flex: 1,
    height: 55,
    color: "#000",
    fontSize: 14,
  },
  emailIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
    opacity: 0.5,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
    lineHeight: 20,
  },
  asterisk: {
    color: "#FF4B6E",
  },
  submitButton: {
    backgroundColor: "#FF4B6E",
    borderRadius: 4,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
}); 