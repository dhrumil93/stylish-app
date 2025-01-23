import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://ecommerce-shop-qg3y.onrender.com/api/category/displayAllCategory"
      );
      const result = await response.json();

      if (result.success) {
        setCategories(result.data);
      } else {
        setError(result.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Network error or server not responding");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#F83758" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.categoriesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category._id}
            style={styles.categoryItem}
          >
            <Image 
              source={{ 
                uri: category.category_photo || "https://via.placeholder.com/48"
              }} 
              style={styles.categoryIcon} 
            />
            <Text style={styles.categoryText}>{category.category_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingVertical: 16,
  },
  categoryItem: {
    alignItems: "center",
    marginHorizontal: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 4,
    backgroundColor: "#F5F5F5",
  },
  categoryText: {
    fontSize: 12,
    color: "#333",
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  errorContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  errorText: {
    color: "#F83758",
    fontSize: 12,
  },
}); 