import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20; // Account for margins and padding

export default function TrendingProductCard({ product, imageStyle, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: product.image || "https://via.placeholder.com/200" }}
        style={[styles.image, imageStyle]}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {product.subtitle}
        </Text>
        <Text style={styles.price}>₹{product.price}</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <AntDesign
                key={index}
                name={index < Math.floor(product.rating) ? "star" : "staro"}
                size={14}
                color="#FFD700"
                style={styles.star}
              />
            ))}
          </View>
          <Text style={styles.reviews}>{product.reviews}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
  image: {
    width: "100%",
    height: CARD_WIDTH * 1.2,
    resizeMode: "contain",
    // backgroundColor: "#F8F8F8",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    lineHeight: 16,
  },
  price: {
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
  star: {
    marginRight: 2,
  },
});
