import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const STATUSBAR_HEIGHT = Platform.OS === "android" ? StatusBar.currentHeight : 0;

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    console.log("Product ID:", id);
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      console.log("Fetching product details for ID:", id);
      const response = await fetch(
        `https://ecommerce-shop-qg3y.onrender.com/api/product/display?id=${id}`
      );
      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        console.log("Setting product data:", result.data.product);
        setProduct(result.data.product);
        setSimilarProducts(result.data.similarProducts || []);
        console.log("Product state after update:", result.data.product);
      } else {
        console.log("API Error:", result.message);
        setError(result.message || "Failed to fetch product details");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Network error or server not responding");
    } finally {
      setLoading(false);
    }
  };

  // Add console log to check product state
  useEffect(() => {
    console.log("Current product state:", product);
  }, [product]);

  useEffect(() => {
    if (product) {
      // Set default size and color from first index
      const sizes = product.size || ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"];
      const colors = product.colour || ["Black", "White", "Red", "Blue"];
      
      // Set initial values without splitting
      setSelectedSize(sizes[0]);
      setSelectedColor(colors[0]);
    }
  }, [product]);

  const handleAddToCart = async () => {
    try {
      console.log("Current selected size:", selectedSize);
      console.log("Current selected color:", selectedColor);

      if (!selectedSize) {
        Alert.alert("Error", "Please select a size");
        return;
      }

      if (!selectedColor) {
        Alert.alert("Error", "Please select a color");
        return;
      }

      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert(
          "Login Required",
          "Please login to add items to cart",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Login", onPress: () => router.push("/(auth)/signin") }
          ]
        );
        return;
      }

      setAddingToCart(true);

      // Store the complete size with "UK" suffix
      const fullSize = selectedSize.includes("UK") ? selectedSize : `${selectedSize}`;

      const requestData = {
        productId: id,
        quantity: 1,
        price: product.price,
        totalPrice: product.price,
        productName: product.name,
        productDescription: product.description,
        productSize: fullSize,
        productColour: selectedColor,
        productImage: product.product_images?.[0] || "",
        brand: product.brand || ""
      };

      console.log("Add to cart request data:", requestData);

      const response = await fetch(
        "https://ecommerce-shop-qg3y.onrender.com/api/cart/addToCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();
      console.log("Add to cart response:", result);

      if (result.success) {
        Alert.alert(
          "Success",
          "Item added to cart successfully",
          [
            {
              text: "Continue Shopping",
              style: "cancel",
            },
            {
              text: "Go to Cart",
              onPress: () => router.push("/(screens)/cart"),
            },
          ]
        );
      } else {
        Alert.alert("Error", result.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to add item to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    console.log("Loading state...");
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#F83758" />
      </View>
    );
  }

  if (error || !product) {
    console.log("Error state:", error);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Product not found"}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Ensure product.images is an array
  const productImages = Array.isArray(product.product_images) ? product.product_images : [];
  console.log("Product Images:", productImages);

  // Define placeholder image URL
  const placeholderImage = "https://cdn-icons-png.flaticon.com/512/3081/3081559.png";

  return (
        <View style={styles.container}>
          {/* Header - Fixed */}
      <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartButton} onPress={() => router.push("/(screens)/cart")}>
              <AntDesign name="shoppingcart" size={24} color="black" />
            </TouchableOpacity>
        </View>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
          >
            {/* Image Slider */}
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={({ nativeEvent }) => {
                const slide = Math.ceil(
              nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
                );
            if (slide >= 0 && slide < productImages.length && currentImageIndex !== slide) {
                  setCurrentImageIndex(slide);
                }
              }}
              scrollEventThrottle={16}
            >
          {productImages.length > 0 ? (
            productImages.map((image, index) => (
                <Image
                  key={index}
                source={{ uri: image || placeholderImage }}
                style={styles.productImage}
                defaultSource={{ uri: placeholderImage }}
              />
            ))
          ) : (
            <Image
              source={{ uri: placeholderImage }}
                  style={styles.productImage}
                />
          )}
            </ScrollView>

            {/* Pagination Dots */}
        {productImages.length > 1 && (
            <View style={styles.pagination}>
            {productImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === currentImageIndex && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
        )}

            {/* Product Info */}
            <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.name || "Product Name"}</Text>
              <Text style={styles.productSubtitle}>
            {product.description || "No description available"}
              </Text>

              {/* Rating */}
              <View style={styles.ratingContainer}>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, index) => (
                    <AntDesign
                      key={index}
                  name={index < Math.floor(product.rating || 0) ? "star" : "staro"}
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
            <Text style={styles.reviews}>0 Reviews</Text>
              </View>

              {/* Price */}
              <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price || 0}</Text>
              </View>

              {/* Size Selection */}
              <Text style={styles.sizeTitle}>Size: {selectedSize}</Text>
              <View style={styles.sizeContainer}>
            {(product?.size || ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"]).map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeButton,
                      selectedSize === size && styles.selectedSizeButton,
                    ]}
                onPress={() => {
                  console.log("Selected size:", size);
                  setSelectedSize(size);
                }}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        selectedSize === size && styles.selectedSizeText,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

          <Text style={styles.colorTitle}>Color: {selectedColor}</Text>
          <View style={styles.colorContainer}>
            {(product?.colour || ["Black", "White", "Red", "Blue"]).map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  selectedColor === color && styles.selectedColorButton,
                ]}
                onPress={() => {
                  console.log("Selected color:", color);
                  setSelectedColor(color);
                }}
              >
                <Text
                  style={[
                    styles.colorText,
                    selectedColor === color && styles.selectedColorText,
                  ]}
                >
                  {color}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

              {/* Product Details */}
              <Text style={styles.detailsTitle}>Product Details</Text>
              <Text style={styles.detailsText}>
            Brand: {product.brand}

            {"\n"}Description: {product.description}
            {"\n"}Stock: {product.stock}
              </Text>

              {/* Store Info */}
              <View style={styles.storeInfo}>
                <View style={styles.storeInfoItem}>
                  <Feather name="map-pin" size={18} color="#666" />
                  <Text style={styles.storeText}>Nearest Store</Text>
                </View>
                <View style={styles.storeInfoItem}>
                  <MaterialCommunityIcons
                    name="crown-outline"
                    size={18}
                    color="#F83758"
                  />
                  <Text style={styles.vipText}>VIP</Text>
                </View>
                <View style={styles.storeInfoItem}>
                  <MaterialCommunityIcons
                    name="refresh"
                    size={18}
                    color="#F83758"
                  />
                  <Text style={styles.returnText}>Return policy</Text>
                </View>
              </View>
            </View>

            {/* Bottom Buttons */}
            <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.viewSimilarButton} onPress={() => router.push("/(screens)/cart")}>
                <Feather
                  name="shopping-cart"
                  size={20}
                  color="#F83758"
                  style={styles.buttonIcon}
                />
                <Text style={styles.viewSimilarText}>View Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addToCartButton}
            onPress={handleAddToCart}
            disabled={addingToCart}
              >
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            {/* Delivery Info */}
            <View style={styles.deliveryInfo}>
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={32}
                color="#F83758"
                style={styles.deliveryIcon}
              />
              <View style={styles.deliveryContent}>
                <Text style={styles.deliveryLabel}>Delivery in</Text>
                <Text style={styles.deliveryTime}>1 within Hour</Text>
              </View>
            </View>

            {/* Compare Actions */}
            <View style={styles.compareActions}>
              <TouchableOpacity style={styles.compareButton}>
                <Feather name="eye" size={20} color="#666" />
                <Text style={styles.compareButtonText}>View Similar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.compareButton}>
                <MaterialCommunityIcons name="compare" size={20} color="#666" />
                <Text style={styles.compareButtonText}>Add to Compare</Text>
              </TouchableOpacity>
            </View>

            {/* Similar Products Section */}
        {similarProducts.length > 0 && (
            <View style={styles.similarSection}>
              <View style={styles.similarHeader}>
              <Text style={styles.similarTitle}>Similar Products</Text>
              <Text style={styles.itemCount}>{similarProducts.length}</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.similarProducts}
              >
              {similarProducts.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.similarCard}
                  onPress={() => router.push({
                    pathname: "/(screens)/product",
                    params: { id: item._id }
                  })}
                >
                  <Image
                    source={{ uri: item.product_images?.[0] || placeholderImage }}
                    style={styles.similarImage}
                  />
                  <View style={styles.similarInfo}>
                    <Text style={styles.similarProductTitle} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.similarProductSubtitle} numberOfLines={2}>
                      {item.description}
                    </Text>
                    <Text style={styles.similarPrice}>₹{item.price}</Text>
                    <View style={styles.similarRating}>
                      <View style={{ flexDirection: "row" }}>
                        {[...Array(5)].map((_, index) => (
                        <AntDesign
                            key={index}
                            name={index < Math.floor(item.rating || 0) ? "star" : "staro"}
                          size={12}
                          color="#FFD700"
                        />
                      ))}
                    </View>
                      <Text style={styles.similarReviews}>
                        {item.reviews?.length || 0}
                    </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              </ScrollView>
            </View>
        )}
          </ScrollView>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: STATUSBAR_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    height: 56,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  productImage: {
    width: width,
    height: width,
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    top: width - 30,
    alignSelf: "center",
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    opacity: 0.5,
  },
  paginationDotActive: {
    width: 24,
    opacity: 1,
    borderRadius: 4,
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  productSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stars: {
    flexDirection: "row",
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
    marginRight: 8,
  },
  sizeTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  selectedSizeButton: {
    backgroundColor: "#F83758",
    borderColor: "#F83758",
  },
  sizeText: {
    fontSize: 14,
    color: "#000",
  },
  selectedSizeText: {
    color: "#FFFFFF",
  },
  colorTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 8,
  },
  colorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  colorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#FFFFFF",
  },
  selectedColorButton: {
    borderColor: "#F83758",
    backgroundColor: "#F83758",
  },
  colorText: {
    fontSize: 14,
    color: "#000000",
  },
  selectedColorText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 24,
  },
  storeInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,

    paddingVertical: 0,
    borderColor: "#F5F5F5",
    marginBottom: 2,
  },
  storeInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    gap: 6,
  },
  storeText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  vipText: {
    fontSize: 14,
    color: "#F83758",
    fontWeight: "500",
  },
  returnText: {
    fontSize: 14,
    color: "#F83758",
    fontWeight: "500",
  },
  bottomButtons: {
    flexDirection: "row",
    padding: 10,
    gap: 16,
    backgroundColor: "#FFFFFF",
    // borderTopWidth: 1,
    // borderTopColor: "#F5F5F5",
  },
  viewSimilarButton: {
    flex: 1,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F83758",
    gap: 8,
  },
  viewSimilarText: {
    color: "#F83758",
    fontSize: 16,
    fontWeight: "600",
  },
  addToCartButton: {
    flex: 1,
    height: 48,
    backgroundColor: "#F83758",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#F83758",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 4,
  },
  deliveryInfo: {
    backgroundColor: "#FFCCD5",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 8,
    borderRadius: 12,
    marginHorizontal: 12,
    height: 60,
  },
  deliveryContent: {
    flex: 1,
    marginLeft: 10,
  },
  deliveryLabel: {
    fontSize: 14,
    color: "#000000",
    // marginBottom: 2,
    fontWeight: "900",
  },
  deliveryTime: {
    fontSize: 16,
    fontWeight: "400",
    color: "#010101",
    letterSpacing: 0.5,
  },
  deliveryIcon: {
    opacity: 0.9,
    // marginLeft: 2,
  },
  compareActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 16,
    gap: 12,
  },
  compareButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    gap: 8,
  },
  compareButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  similarSection: {
    marginTop: 20,
    paddingBottom: 4,
  },
  similarHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  similarTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  itemCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  similarProducts: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 2,
    gap: 12,
  },
  similarCard: {
    width: width * 0.45,
    // height: width * 0.7,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginRight: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  similarImage: {
    width: "100%",
    height: width * 0.55,
    resizeMode: "cover",
    backgroundColor: "#F8F8F8",
  },
  similarInfo: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  similarProductTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  similarProductSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
    lineHeight: 16,
  },
  similarPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginTop: 2,
  },
  similarRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  similarReviews: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  errorText: {
    color: "#F83758",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#F83758",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
