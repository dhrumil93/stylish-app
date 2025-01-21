import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Forgot{"\n"}password?</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Image
            source={require("../../assets/images/email.png")}
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
          We will send you a message to set or reset{"\n"}your new password
        </Text>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => {
            // Add your password reset logic here
            router.back(); // Go back to signin page after submission
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
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
    marginLeft: "32px",
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
    height: "15px",
    color: "#000",
    fontSize: 14,
    alignItems: "center",
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