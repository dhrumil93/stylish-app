import React, { useState, useEffect } from "react";
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
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      
      if (!token) {
        Alert.alert(
          "Login Required", 
          "Please login to view your cart",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Login", onPress: () => router.push("/(auth)/signin") }
          ]
        );
        return;
      }

      const response = await fetch(
        "https://ecommerce-shop-qg3y.onrender.com/api/cart/displayCart",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const result = await response.json();
      console.log("Cart items response:", result);

      if (result.success) {
        setCartItems(result.data);
      } else {
        setError(result.message || "Failed to fetch cart items");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to fetch cart items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      
      const response = await fetch(
        "https://ecommerce-shop-qg3y.onrender.com/api/cart/updateQuantity",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            cartItemId: itemId,
            quantity: newQuantity,
          }),
        }
      );

      const result = await response.json();
      console.log("Update quantity response:", result);

      if (result.success) {
        fetchCartItems(); // Refresh cart items
      } else {
        Alert.alert("Error", result.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to update quantity. Please try again.");
    }
  };

  const calculateTotals = () => {
    let totalPrice = 0;
    let totalOriginalPrice = 0;

    cartItems.forEach(item => {
      totalPrice += item.product.price * item.quantity;
      totalOriginalPrice += (item.product.originalPrice || item.product.price) * item.quantity;
    });

    return {
      totalPrice,
      totalOriginalPrice,
      totalDiscount: totalOriginalPrice - totalPrice
    };
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F83758" />
        </View>
      </SafeAreaView>
    );
  }

  const { totalPrice, totalOriginalPrice, totalDiscount } = calculateTotals();

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={[styles.safeArea, {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }]}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Shopping Cart</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {cartItems.length === 0 ? (
              <View style={styles.emptyCart}>
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
                <TouchableOpacity
                  style={styles.shopNowButton}
                  onPress={() => router.push("/(screens)/home")}
                >
                  <Text style={styles.shopNowText}>Shop Now</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {cartItems.map((item) => (
                  <View key={item._id} style={styles.cartItem}>
                    <Image
                      source={{ uri: item.product.product_images[0] }}
                      style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                      <Text style={styles.productTitle}>{item.product.name}</Text>
                      <Text style={styles.productSubtitle}>{item.product.description}</Text>
                      <Text style={styles.size}>Size: {item.size}</Text>
                      <View style={styles.priceContainer}>
                        <Text style={styles.price}>₹{item.product.price}</Text>
                        {item.product.originalPrice && (
                          <>
                            <Text style={styles.originalPrice}>
                              ₹{item.product.originalPrice}
                            </Text>
                            <Text style={styles.discount}>
                              {Math.round((1 - item.product.price / item.product.originalPrice) * 100)}% Off
                            </Text>
                          </>
                        )}
                      </View>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          style={[
                            styles.quantityButton,
                            item.quantity === 1 && styles.quantityButtonDisabled,
                          ]}
                          onPress={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity === 1}
                        >
                          <AntDesign
                            name="minus"
                            size={20}
                            color={item.quantity === 1 ? "#CCC" : "#666"}
                          />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                          <AntDesign name="plus" size={20} color="#666" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}

                {/* Price Details */}
                <View style={styles.priceDetails}>
                  <Text style={styles.sectionTitle}>Price Details</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>
                      Price ({cartItems.length} item{cartItems.length > 1 ? "s" : ""})
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
              </>
            )}
          </ScrollView>

          {cartItems.length > 0 && (
            <View style={styles.bottomButton}>
              <TouchableOpacity 
                style={styles.checkoutButton}
                onPress={() => router.push("/(screens)/checkout")}
              >
                <Text style={styles.checkoutText}>Place Order</Text>
              </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  shopNowButton: {
    backgroundColor: "#F83758",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopNowText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
