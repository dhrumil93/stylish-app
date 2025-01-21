import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function OrderConfirmation() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(screens)/home")}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Success Animation */}
      <View style={styles.successContainer}>
        <View style={styles.checkmarkCircle}>
          <AntDesign name="check" size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.successTitle}>Order Placed!</Text>
        <Text style={styles.successMessage}>
          Your order has been placed successfully.
        </Text>
      </View>

      {/* Order Details */}
      <View style={styles.orderDetails}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order Number</Text>
          <Text style={styles.detailValue}>#ORD123456789</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount Paid</Text>
          <Text style={styles.detailValue}>₹ {params.amount || "0.00"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method</Text>
          <Text style={styles.detailValue}>{params.paymentMethod || "Card"}</Text>
        </View>
      </View>

      {/* Delivery Info */}
      <View style={styles.deliveryInfo}>
        <Text style={styles.sectionTitle}>Delivery Information</Text>
        <View style={styles.deliveryTimeContainer}>
          <AntDesign name="clockcircleo" size={24} color="#666" />
          <View style={styles.deliveryTimeInfo}>
            <Text style={styles.deliveryTimeTitle}>Estimated Delivery</Text>
            <Text style={styles.deliveryTime}>May 10, 2024 by 6:00 PM</Text>
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={styles.trackButton}
          onPress={() => {
            // Add tracking functionality
          }}
        >
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push("/(screens)/home")}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 16,
    alignItems: "flex-end",
  },
  successContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  orderDetails: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F5F5F5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  deliveryInfo: {
    padding: 16,
  },
  deliveryTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 8,
  },
  deliveryTimeInfo: {
    marginLeft: 12,
  },
  deliveryTimeTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 16,
    fontWeight: "500",
  },
  bottomButtons: {
    padding: 16,
    marginTop: "auto",
  },
  trackButton: {
    backgroundColor: "#FF4B6E",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  trackButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  continueButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF4B6E",
  },
  continueButtonText: {
    color: "#FF4B6E",
    fontSize: 16,
    fontWeight: "600",
  },
}); 