import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Payment() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedMethod, setSelectedMethod] = useState("card");

  const paymentMethods = [
    {
      id: "card",
      title: "Credit / Debit Card",
      icon: "credit-card",
      description: "Pay with Visa, Mastercard",
    },
    {
      id: "upi",
      title: "UPI",
      icon: "cellphone",
      description: "Google Pay, PhonePe, Paytm",
    },
    {
      id: "netbanking",
      title: "Net Banking",
      icon: "bank",
      description: "All Indian banks",
    },
    {
      id: "wallet",
      title: "Wallet",
      icon: "wallet",
      description: "Paytm, PhonePe, Amazon Pay",
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      icon: "cash",
      description: "Pay when you receive",
    },
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={[styles.container, {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Methods</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Order Amount */}
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Order Amount</Text>
            <Text style={styles.amount}>₹{params.amount || "0.00"}</Text>
          </View>

          {/* Payment Methods */}
          <View style={styles.methodsContainer}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodCard,
                  selectedMethod === method.id && styles.selectedMethod,
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.methodLeft}>
                  <MaterialCommunityIcons
                    name={method.icon}
                    size={24}
                    color={selectedMethod === method.id ? "#FF4B6E" : "#666"}
                  />
                  <View style={styles.methodInfo}>
                    <Text style={styles.methodTitle}>{method.title}</Text>
                    <Text style={styles.methodDescription}>
                      {method.description}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedMethod === method.id && styles.radioButtonSelected,
                  ]}
                >
                  {selectedMethod === method.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Offers Section */}
          <View style={styles.offersSection}>
            <Text style={styles.sectionTitle}>Bank Offers</Text>
            <View style={styles.offerCard}>
              <MaterialCommunityIcons
                name="tag-outline"
                size={24}
                color="#FF4B6E"
              />
              <View style={styles.offerInfo}>
                <Text style={styles.offerTitle}>
                  10% instant discount on HDFC Bank Cards
                </Text>
                <Text style={styles.offerTerms}>
                  Min. transaction amount: ₹2,000
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Payment Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => {
              router.push({
                pathname: "/(screens)/order-confirmation",
                params: {
                  amount: params.amount,
                  paymentMethod: selectedMethod
                }
              });
            }}
          >
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  amountContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  amountLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  amount: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  methodsContainer: {
    padding: 16,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedMethod: {
    borderColor: "#FF4B6E",
    backgroundColor: "#FFF5F7",
  },
  methodLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  methodInfo: {
    marginLeft: 12,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    color: "#666",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#FF4B6E",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF4B6E",
  },
  offersSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  offerCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFF5F7",
    borderRadius: 8,
    alignItems: "center",
  },
  offerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  offerTerms: {
    fontSize: 12,
    color: "#666",
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  payButton: {
    backgroundColor: "#FF4B6E",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
}); 