import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import MasonryList from '@react-native-seoul/masonry-list';
import ProductCard from "../../components/ProductCard";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 48) / 2;

export default function CategoryProducts() {
  const { id, name } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategoryProducts();
  }, [id]);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ecommerce-shop-qg3y.onrender.com/api/product/displayAll?category=${id}`
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

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      style={styles.productCard}
    />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F83758" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        <Text style={styles.categoryTitle}>{name}</Text>
        <MasonryList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    padding: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  productCard: {
    margin: 8,
    width: COLUMN_WIDTH,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: "#F83758",
    fontSize: 16,
    textAlign: "center",
  },
}); 