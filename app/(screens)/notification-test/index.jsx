import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import NotificationService from "../../services/NotificationService";

export default function NotificationTest() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSendNotification = async (type) => {
    if (!title.trim() || !message.trim()) {
      Alert.alert("Error", "Please enter both title and message");
      return;
    }

    try {
      setLoading(true);
      let result;

      switch (type) {
        case "promotional":
          result = await NotificationService.sendPromotionalNotification(
            title,
            message,
            "PROMO20"
          );
          break;
        case "product":
          result = await NotificationService.sendNewProductNotification(
            title,
            "product123",
            999
          );
          break;
        case "flash_sale":
          result = await NotificationService.sendFlashSaleNotification(
            title,
            50,
            message
          );
          break;
        case "order":
          // Note: Order notifications should typically be sent from the server
          // when an order status changes. This is just for testing.
          Alert.alert(
            "Note",
            "Order notifications should typically be sent from the server when an order status changes."
          );
          return;
        default:
          Alert.alert("Error", "Invalid notification type");
          return;
      }

      if (result?.success) {
        Alert.alert("Success", "Notification sent to all users successfully!");
        setTitle("");
        setMessage("");
      } else {
        throw new Error(result?.message || "Failed to send notification");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      Alert.alert("Error", error.message || "Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

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
            <Text style={styles.headerTitle}>
              Send Notifications to All Users
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Notifications will be sent to all registered users through the
                server.
              </Text>
              <Text style={styles.infoText}>
                This Part is under Construction and for learning Purpose.
              </Text>
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Notification Title</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter notification title"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Notification Message</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                value={message}
                onChangeText={setMessage}
                placeholder="Enter notification message"
                placeholderTextColor="#999"
                multiline
              />
            </View>

            {/* Notification Type Buttons */}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSendNotification("promotional")}
                disabled={loading}
              >
                <Text style={styles.buttonText}>Send Promotional to All</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSendNotification("product")}
                disabled={loading}
              >
                <Text style={styles.buttonText}>Send New Product to All</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSendNotification("flash_sale")}
                disabled={loading}
              >
                <Text style={styles.buttonText}>Send Flash Sale to All</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#F83758" />
            </View>
          )}
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
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonGroup: {
    marginTop: 24,
    gap: 12,
  },
  button: {
    backgroundColor: "#F83758",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
