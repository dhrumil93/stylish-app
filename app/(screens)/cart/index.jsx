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
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddressManager from "../../components/AddressManager";

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert("Login Required", "Please login to view your cart", [
          { text: "Cancel", style: "cancel" },
          { text: "Login", onPress: () => router.push("/(auth)/signin") },
        ]);
        return;
      }

      const response = await fetch(
        "https://ecommerce-shop-qg3y.onrender.com/api/cart/displayCart",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const result = await response.json();
      console.log("Cart items response:", result);

      if (result.success && result.data && result.data.length > 0) {
        // Access the items array from the first cart object
        setCartItems(result.data[0].items || []);
        console.log("Parsed cart items:", result.data[0].items);
      } else {
        setCartItems([]);
        setError(result.message || "Failed to fetch cart items");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to fetch cart items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (
    itemId,
    newQuantity,
    productSize,
    productColour
  ) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert("Error", "Please login to update cart");
        return;
      }

      const requestData = {
        productId: itemId,
        quantity: newQuantity,
        productSize: currentItem.productSize,
        productColour: currentItem.productColour,
      };

      console.log("Update cart request:", requestData);

      const response = await fetch(
        "https://ecommerce-shop-qg3y.onrender.com/api/cart/updateCart",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();
      console.log("Update quantity response:", result);

      if (result.success) {
        // Refresh cart items after successful update
        fetchCartItems();
      } else {
        Alert.alert("Error", result.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to update quantity. Please try again.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert("Error", "Please login to remove items");
        return;
      }
      const requestData = {
        data: {
          productId: productId,
          productColour: productColour,
          productSize: productSize,
        },
      };

      const response = await fetch(
        "https://ecommerce-shop-qg3y.onrender.com/api/cart/removeCart",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();
      console.log("Remove from cart response:", result);

      if (result.success) {
        // Refresh cart items after successful removal
        fetchCartItems();
      } else {
        Alert.alert("Error", result.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to remove item. Please try again.");
    }
  };

  const calculateTotals = () => {
    if (!cartItems || cartItems.length === 0) {
      return {
        totalPrice: 0,
      };
    }

    let totalPrice = 0;

    cartItems.forEach((item) => {
      if (item) {
        totalPrice += (item.price || 0) * (item.quantity || 1);
      }
    });

    return {
      totalPrice,
    };
  };

  const handleSelectAddress = (address) => {
    if (address && address._id) {
      setSelectedAddress(address);
      setShowAddressModal(false);
    }
  };

  const handleCheckout = () => {
    if (!selectedAddress) {
      Alert.alert(
        "Address Required",
        "Please select a delivery address before proceeding to checkout",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]
      );
      return;
    }

    router.push({
      pathname: "/(screens)/order-summary",
      params: {
        cartItems: JSON.stringify(cartItems),
        selectedAddress: JSON.stringify(selectedAddress),
        totalAmount: totalPrice,
      },
    });
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

  const { totalPrice } = calculateTotals();

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
            <TouchableOpacity
              onPress={() => {
                if (showAddressModal) {
                  setShowAddressModal(false);
                } else {
                  router.back();
                }
              }}
            >
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {showAddressModal ? "Select Address" : "Shopping Cart"}
            </Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Delivery Address Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            {selectedAddress && selectedAddress._id ? (
              <View style={styles.selectedAddress}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressType}>
                    {selectedAddress.type || selectedAddress.address_type}
                  </Text>
                  {selectedAddress.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.addressName}>
                  {selectedAddress.name || selectedAddress.fullName}
                </Text>
                <Text style={styles.addressPhone}>
                  {selectedAddress.phone || selectedAddress.phoneNumber}
                </Text>
                <Text style={styles.addressText}>
                  {selectedAddress.address1 || selectedAddress.addressLine1}
                  {selectedAddress.address2 || selectedAddress.addressLine2
                    ? `, ${
                        selectedAddress.address2 || selectedAddress.addressLine2
                      }`
                    : ""}
                  {selectedAddress.landmark
                    ? `, ${selectedAddress.landmark}`
                    : ""}
                  {`\n${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`}
                </Text>
                <TouchableOpacity
                  style={styles.changeAddressButton}
                  onPress={() => setShowAddressModal(true)}
                >
                  <Text style={styles.changeAddressText}>Change Address</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addAddressButton}
                onPress={() => setShowAddressModal(true)}
              >
                <AntDesign name="plus" size={20} color="#F83758" />
                <Text style={styles.addAddressText}>
                  Select Delivery Address
                </Text>
              </TouchableOpacity>
            )}
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
                {cartItems.map((item, index) => (
                  <View
                    key={`${item.productId}-${index}`}
                    style={styles.cartItem}
                  >
                    <View style={styles.cartItemHeader}>
                      <Text style={styles.productTitle}>
                        {item.productName || "Product Name"}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            "Remove Item",
                            "Are you sure you want to remove this item?",
                            [
                              { text: "Cancel", style: "cancel" },
                              {
                                text: "Remove",
                                onPress: () => removeFromCart(item.productId),
                              },
                            ]
                          );
                        }}
                        style={styles.deleteButton}
                      >
                        <AntDesign name="delete" size={14} color="#F83758" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.cartItemContent}>
                      <Image
                        source={{
                          uri:
                            `https://ecommerce-shop-qg3y.onrender.com/api/product/displayImage/${item.productId}` ||
                            "https://via.placeholder.com/100",
                        }}
                        style={styles.productImage}
                      />
                      <View style={styles.productInfo}>
                        <Text style={styles.productSubtitle}>
                          {item.productDescription || "Description"}
                        </Text>
                        <View style={styles.detailsContainer}>
                          <View style={styles.sizeContainer}>
                            <Text style={styles.detailLabel}>Size:</Text>
                            <Text style={styles.detailValue}>
                              {item.size || "N/A"}
                            </Text>
                          </View>
                          <View style={styles.colorContainer}>
                            <Text style={styles.detailLabel}>Color:</Text>
                            <Text style={styles.detailValue}>
                              {item.colour || "N/A"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text style={styles.price}>₹{item.price || 0}</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                          <TouchableOpacity
                            style={[
                              styles.quantityButton,
                              item.quantity === 1 &&
                                styles.quantityButtonDisabled,
                            ]}
                            onPress={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}
                          >
                            <AntDesign
                              name="minus"
                              size={20}
                              color={item.quantity === 1 ? "#CCC" : "#666"}
                            />
                          </TouchableOpacity>
                          <Text style={styles.quantity}>
                            {item.quantity || 1}
                          </Text>
                          <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                          >
                            <AntDesign name="plus" size={20} color="#666" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}

                {/* Price Details */}
                <View style={styles.priceDetails}>
                  <Text style={styles.priceDetailsTitle}>Price Details</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>
                      Price ({cartItems.length} items)
                    </Text>
                    <Text style={styles.priceValue}>₹{totalPrice}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Delivery Charges</Text>
                    <Text style={[styles.priceValue, styles.freeDelivery]}>
                      Free
                    </Text>
                  </View>
                  <View style={[styles.priceRow, styles.totalRow]}>
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
                onPress={handleCheckout}
                disabled={!cartItems.length}
              >
                <Text style={styles.checkoutText}>{"Place Order"}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>

      {/* Address Modal */}
      <Modal
        visible={showAddressModal}
        animationType="slide"
        onRequestClose={() => setShowAddressModal(false)}
      >
        <AddressManager
          onSelectAddress={handleSelectAddress}
          selectedAddressId={selectedAddress?._id}
        />
      </Modal>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  cartItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cartItemContent: {
    flexDirection: "row",
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
  },
  productSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  detailsContainer: {
    marginVertical: 4,
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  colorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },
  detailValue: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
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
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  addressHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  changeText: {
    fontSize: 14,
    color: "#F83758",
    fontWeight: "500",
  },
  selectedAddress: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
  },
  noAddress: {
    backgroundColor: "#FFF0F3",
    padding: 12,
    borderRadius: 8,
  },
  noAddressText: {
    fontSize: 14,
    color: "#F83758",
    textAlign: "center",
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
  priceDetailsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  deleteButton: {
    padding: 4,
    backgroundColor: "#FFF0F3",
    borderRadius: 8,
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  selectedAddress: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  addressType: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  addressName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  addressPhone: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  changeAddressButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#FFF0F3",
    marginTop: 8,
  },
  changeAddressText: {
    fontSize: 14,
    color: "#F83758",
    fontWeight: "500",
  },
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F83758",
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
  },
  addAddressText: {
    fontSize: 16,
    color: "#F83758",
    fontWeight: "500",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  defaultBadge: {
    backgroundColor: "#00A36C",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});
