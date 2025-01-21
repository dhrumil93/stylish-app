import React, { useState } from "react";
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
} from "react-native";
import { useRouter } from "expo-router";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const STATUSBAR_HEIGHT = Platform.OS === "android" ? StatusBar.currentHeight : 0;

export default function ProductDetail() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("7 UK");

  const images = [
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
    "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80",
    "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&q=80",
    "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80",
  ];

  const sizes = ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"];

  return (
    <View style={styles.container}>
      {/* Header - Fixed */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton}>
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
              nativeEvent.contentOffset.x /
                nativeEvent.layoutMeasurement.width
            );
            if (currentImageIndex !== slide) {
              setCurrentImageIndex(slide);
            }
          }}
          scrollEventThrottle={16}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.productImage}
            />
          ))}
        </ScrollView>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentImageIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>Nike Sneakers</Text>
          <Text style={styles.productSubtitle}>
            Vision Alta Men's Shoes Size (All Colours)
          </Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[...Array(5)].map((_, index) => (
                <AntDesign
                  key={index}
                  name={index < 4 ? "star" : "staro"}
                  size={16}
                  color="#FFD700"
                />
              ))}
            </View>
            <Text style={styles.reviews}>56,890</Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹1,500</Text>
            <Text style={styles.originalPrice}>₹2,999</Text>
            <Text style={styles.discount}>50% Off</Text>
          </View>

          {/* Size Selection */}
          <Text style={styles.sizeTitle}>Size: {selectedSize}</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton,
                ]}
                onPress={() => setSelectedSize(size)}
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

          {/* Product Details */}
          <Text style={styles.detailsTitle}>Product Details</Text>
          <Text style={styles.detailsText}>
            Perhaps the most iconic sneaker of all-time, this original
            "Chicago" 7 colorway is the cornerstone to any sneaker
            collection. Made famous in 1985 by Michael Jordan, the shoe has
            stood the test of time, becoming the most famous colorway of the
            Air Jordan 1. This 2015 release saw the ...
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
          <TouchableOpacity style={styles.viewSimilarButton}>
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
            onPress={() => router.push("/(screens)/cart")}
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
        <View style={styles.similarSection}>
          <View style={styles.similarHeader}>
            <Text style={styles.similarTitle}>Similar To</Text>
            <Text style={styles.itemCount}>282+ Items</Text>
            <View style={styles.filterContainer}>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Sort</Text>
                <AntDesign name="down" size={16} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Filter</Text>
                <Feather name="filter" size={16} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Similar Products */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.similarProducts}
          >
            <TouchableOpacity style={styles.similarCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
                }}
                style={styles.similarImage}
              />
              <View style={styles.similarInfo}>
                <Text style={styles.similarProductTitle}>
                  Nike Sneakers
                </Text>
                <Text style={styles.similarProductSubtitle}>
                  Nike Air Jordan Retro 1 Low Mystic Black
                </Text>
                <Text style={styles.similarPrice}>₹1,900</Text>
                <View style={styles.similarRating}>
                  {[...Array(5)].map((_, i) => (
                    <AntDesign
                      key={i}
                      name={i < 4 ? "star" : "staro"}
                      size={12}
                      color="#FFD700"
                    />
                  ))}
                  <Text style={styles.similarReviews}>46,890</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.similarCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
                }}
                style={styles.similarImage}
              />
              <View style={styles.similarInfo}>
                <Text style={styles.similarProductTitle}>
                  Nike Sneakers
                </Text>
                <Text style={styles.similarProductSubtitle}>
                  Mid Peach Mocha Shoes For Man White Black Pink S...
                </Text>
                <Text style={styles.similarPrice}>₹1,900</Text>
                <View style={styles.similarRating}>
                  {[...Array(5)].map((_, i) => (
                    <AntDesign
                      key={i}
                      name={i < 4 ? "star" : "staro"}
                      size={12}
                      color="#FFD700"
                    />
                  ))}
                  <Text style={styles.similarReviews}>2,56,890</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.similarCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
                }}
                style={styles.similarImage}
              />
              <View style={styles.similarInfo}>
                <Text style={styles.similarProductTitle}>
                  Nike Sneakers
                </Text>
                <Text style={styles.similarProductSubtitle}>
                  Mid Peach Mocha Shoes For Man White Black Pink S...
                </Text>
                <Text style={styles.similarPrice}>₹1,900</Text>
                <View style={styles.similarRating}>
                  {[...Array(5)].map((_, i) => (
                    <AntDesign
                      key={i}
                      name={i < 4 ? "star" : "staro"}
                      size={12}
                      color="#FFD700"
                    />
                  ))}
                  <Text style={styles.similarReviews}>2,56,890</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
  originalPrice: {
    fontSize: 16,
    color: "#666",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discount: {
    fontSize: 16,
    color: "#F83758",
  },
  sizeTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
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
    // paddingBottom: 0,
  },
  similarHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  similarTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  itemCount: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
  filterContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    gap: 12,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  filterText: {
    fontSize: 14,
    color: "#000",
  },
  similarProducts: {
    paddingHorizontal: 12,
    gap: 12,
  },
  similarCard: {
    width: 200,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginRight: 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  similarImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  similarInfo: {
    padding: 12,
  },
  similarProductTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  similarProductSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  similarPrice: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
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
});
