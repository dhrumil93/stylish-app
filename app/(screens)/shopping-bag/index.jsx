import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ShoppingBag() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState("42");
  const [quantity, setQuantity] = useState(1);

  // Calculate prices
  const price = params.price || 7000;
  const orderAmount = price * quantity;
  const deliveryFee = 0; // Free delivery

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Bag</Text>
        <TouchableOpacity>
          <AntDesign name="hearto" size={24} color="#FF4B6E" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Card */}
        <View style={styles.productCard}>
          <Image source={{ uri: params.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{params.title}</Text>
            <Text style={styles.productSubtitle}>{params.subtitle}</Text>

            {/* Size Selector */}
            <View style={styles.sizeContainer}>
              <Text style={styles.label}>Size</Text>
              <TouchableOpacity style={styles.sizeButton}>
                <Text style={styles.selectedSize}>{selectedSize}</Text>
                <AntDesign name="down" size={12} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Quantity Selector */}
            <View style={styles.quantityContainer}>
              <Text style={styles.label}>Qty</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    quantity === 1 && styles.quantityButtonDisabled,
                  ]}
                  onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  <AntDesign
                    name="minus"
                    size={16}
                    color={quantity === 1 ? "#CCC" : "#666"}
                  />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <AntDesign name="plus" size={16} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.deliveryDate}>Delivery by 10 May 2999</Text>
          </View>
        </View>

        {/* Coupons Section */}
        <View style={styles.couponSection}>
          <View style={styles.couponLeft}>
            <MaterialCommunityIcons
              name="ticket-percent-outline"
              size={24}
              color="#000000"
              style={styles.couponIcon}
            />
            <Text style={styles.couponText}>Apply Coupons</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.selectText}>Select</Text>
          </TouchableOpacity>
        </View>

        {/* Order Details */}
        <View style={styles.orderDetails}>
          <Text style={styles.sectionTitle}>Order Payment Details</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Order Amount</Text>
            <Text style={styles.priceValue}>₹ {orderAmount.toFixed(2)}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Convenience</Text>
            <TouchableOpacity>
              <Text style={styles.knowMore}>Know More</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.applyCoupon}>Apply Coupon</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Fee</Text>
            <Text style={styles.freeDelivery}>Free</Text>
          </View>

          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Order Total</Text>
            <Text style={styles.totalValue}>₹ {orderAmount.toFixed(2)}</Text>
          </View>
        </View>

        {/* EMI Info */}
        <View style={styles.emiInfo}>
          <Text style={styles.emiText}>EMI Available</Text>
          <TouchableOpacity>
            <Text style={styles.detailsText}>Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Payment Button */}
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹ {orderAmount.toFixed(2)}</Text>
          <TouchableOpacity>
            <Text style={styles.viewDetails}>View Details</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => router.push({
            pathname: "/(screens)/payment",
            params: {
              amount: orderAmount.toFixed(2)
            }
          })}
        >
          <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
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
  productCard: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  productImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginRight: 12,
  },
  sizeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  selectedSize: {
    fontSize: 14,
    marginRight: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 16,
  },
  deliveryDate: {
    fontSize: 14,
    color: "#666",
  },
  couponSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  couponLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  couponIcon: {
    marginRight: 12,
  },
  couponText: {
    fontSize: 16,
    fontWeight: "500",
  },
  selectText: {
    color: "#FF4B6E",
    fontSize: 14,
    fontWeight: "500",
  },
  orderDetails: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  priceLabel: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  knowMore: {
    fontSize: 14,
    color: "#FF4B6E",
    marginRight: 12,
  },
  applyCoupon: {
    fontSize: 14,
    color: "#FF4B6E",
  },
  freeDelivery: {
    fontSize: 14,
    color: "#00A36C",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    paddingTop: 12,
    marginTop: 12,
  },
  totalLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  emiInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  emiText: {
    flex: 1,
    fontSize: 14,
  },
  detailsText: {
    fontSize: 14,
    color: "#FF4B6E",
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
  },
  viewDetails: {
    fontSize: 14,
    color: "#FF4B6E",
  },
  paymentButton: {
    backgroundColor: "#FF4B6E",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  paymentButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
