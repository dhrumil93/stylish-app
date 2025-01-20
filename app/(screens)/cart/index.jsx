import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function Cart() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const cartItem = {
    title: "Nike Sneakers",
    subtitle: "Vision Alta Men's Shoes Size (All Colours)",
    price: 1500,
    originalPrice: 2999,
    size: "7 UK",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
  };

  const address = {
    name: "John Doe",
    street: "216 St Paul's Rd",
    city: "London",
    state: "N1 2LL",
    country: "United Kingdom",
    pincode: "450116",
  };

  const totalPrice = cartItem.price * quantity;
  const totalOriginalPrice = cartItem.originalPrice * quantity;
  const totalDiscount = totalOriginalPrice - totalPrice;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <View style={{ width: 24 }} />
        </View>
        {/* Delivery Address */}
        <View style={styles.addressSection}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Feather name="map-pin" size={20} color="#666" />
              <Text style={styles.addressType}>Home</Text>
              <TouchableOpacity style={styles.changeButton}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{address.name}</Text>
            <Text style={styles.address}>
              {address.street}, {address.city},{"\n"}
              {address.state}, {address.country} - {address.pincode}
            </Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          {/* Cart Item */}
          <View style={styles.cartItem}>
            <Image
              source={{ uri: cartItem.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{cartItem.title}</Text>
              <Text style={styles.productSubtitle}>{cartItem.subtitle}</Text>
              <Text style={styles.size}>Size: {cartItem.size}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{cartItem.price}</Text>
                <Text style={styles.originalPrice}>
                  ₹{cartItem.originalPrice}
                </Text>
                <Text style={styles.discount}>50% Off</Text>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    quantity === 1 && styles.quantityButtonDisabled,
                  ]}
                  onPress={decreaseQuantity}
                >
                  <AntDesign
                    name="minus"
                    size={20}
                    color={quantity === 1 ? "#CCC" : "#666"}
                  />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={increaseQuantity}
                >
                  <AntDesign name="plus" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Price Details */}
          <View style={styles.priceDetails}>
            <Text style={styles.sectionTitle}>Price Details</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                Price ({quantity} item{quantity > 1 ? "s" : ""})
              </Text>
              <Text style={styles.priceValue}>₹{totalOriginalPrice}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Discount</Text>
              <Text style={styles.discountValue}>-₹{totalDiscount}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Delivery Charges</Text>
              <Text style={styles.freeDelivery}>Free</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{totalPrice}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomButton}>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
  cartItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  size: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discount: {
    fontSize: 14,
    color: "#00A36C",
    fontWeight: "500",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonDisabled: {
    borderColor: "#EEE",
    backgroundColor: "#F5F5F5",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 16,
  },
  addressSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  addressCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 16,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  addressType: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  changeButton: {
    marginLeft: "auto",
  },
  changeText: {
    color: "#F83758",
    fontSize: 14,
    fontWeight: "500",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  priceDetails: {
    padding: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  priceValue: {
    fontSize: 14,
    color: "#000",
  },
  discountValue: {
    fontSize: 14,
    color: "#00A36C",
  },
  freeDelivery: {
    fontSize: 14,
    color: "#00A36C",
    fontWeight: "500",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  bottomButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  checkoutButton: {
    backgroundColor: "#F83758",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
