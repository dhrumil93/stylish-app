import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function ProductCard({ product, style }) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/(screens)/product",
      params: { id: product._id }
    });
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.product_images?.[0] || "https://via.placeholder.com/200" }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {product.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={12} color="#FFD700" />
            <Text style={styles.rating}>
              {product.rating?.toFixed(1) || "4.5"}
            </Text>
          </View>
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
  imageContainer: {
    width: "100%",
    height: 150,
    // backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: CARD_WIDTH * 1.2,
    resizeMode: "contain",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F83758",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  rating: {
    fontSize: 12,
    color: "#333",
    marginLeft: 4,
  },
}); 