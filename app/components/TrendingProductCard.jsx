import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function TrendingProductCard({ product, style, imageStyle }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.productCard, style]}
      onPress={() => router.push("/product")}
    >
      <Image
        source={{ uri: product.image }}
        style={[styles.productImage, imageStyle]}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.productSubtitle} numberOfLines={2}>
          {product.subtitle}
        </Text>
        <Text style={styles.productPrice}>₹{product.price.toLocaleString()}</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <AntDesign
                key={index}
                name={index < Math.floor(product.rating) ? "star" : "staro"}
                size={12}
                color="#FFD700"
              />
            ))}
          </View>
          <Text style={styles.reviews}>
            {product.reviews.toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    margin: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImage: {
    width: "100%",
    resizeMode: "cover",
  },
  productInfo: {
    padding: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 2,
  },
  productSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    lineHeight: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  stars: {
    flexDirection: "row",
    marginRight: 6,
  },
  reviews: {
    fontSize: 12,
    color: "#666",
  },
}); 