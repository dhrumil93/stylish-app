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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome{"\n"}Back!</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Image
            source={require("../../assets/images/user.png")}
            style={styles.userIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require("../../assets/images/group2.png")}
            style={styles.lockIcon}
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
              source={require("../../assets/images/eye.png")}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/(auth)/forgot-password")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => router.push('/(screens)/welcome')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>- OR Continue with -</Text>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/images/google.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/images/apple.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/images/facebook.png")}
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
    marginTop:56 ,
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
  input: {
    flex: 1,
    height: "15px",
    color: "#000",
    fontSize: 14,
    alignItems:'center'
  },
  userIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  lockIcon: {
    width: 16,
    height: 20,
    marginRight: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    opacity: 0.5,
  },
  forgotPassword: {
    color: "#FF4B6E",
    textAlign: "right",
    marginBottom: 30,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#FF4B6E",
    borderRadius: 4,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  loginButtonText: {
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
