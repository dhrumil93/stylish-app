import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather, AntDesign } from "@expo/vector-icons";
import MasonryList from "@react-native-seoul/masonry-list";
import TrendingProductCard from "../../components/TrendingProductCard";

const { width } = Dimensions.get("window");

export default function Trending() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://ecommerce-shop-qg3y.onrender.com/api/product/displayAll?category="
      );
      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
      } else {
        setError(result.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Network error or server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149852.png",
          }}
          style={[styles.searchIcon, { tintColor: "#666" }]}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search any Product..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/709/709682.png",
            }}
            style={[styles.micIcon, { tintColor: "#666" }]}
          />
        </TouchableOpacity>
      </View>

      {/* Sub Header */}
      <View style={styles.subHeader}>
        <Text style={styles.headerTitle}>
          {Array.isArray(products) ? `${products.length}+ Items` : "Loading..."}
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>Sort</Text>
            <Feather name="chevron-down" size={16} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filter</Text>
            <Feather name="filter" size={16} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Products Grid */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#F83758" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <MasonryList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.productsContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: product }) => (
            <TrendingProductCard
              product={{
                id: product._id,
                title: product.name,
                subtitle: product.description,
                price: product.price,
                rating: product.rating || 0,
                reviews: product.reviews?.length || 0,
                image: product.product_images?.[0],
              }}
              onPress={() => router.push({
                pathname: "/(screens)/product",
                params: { id: product._id }
              })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 44,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  micIcon: {
    width: 20,
    height: 20,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sortText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000",
  },
  filterIcon: {
    width: 16,
    height: 16,
  },
  productsContainer: {
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 90,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  errorText: {
    color: "#F83758",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },
});
