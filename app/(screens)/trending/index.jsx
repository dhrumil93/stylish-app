import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather, AntDesign } from "@expo/vector-icons";
import MasonryList from "@react-native-seoul/masonry-list";
import TrendingProductCard from "../../components/TrendingProductCard";

const { width } = Dimensions.get("window");

const products = [
  {
    id: 1,
    title: "Black Winter Jacket",
    subtitle: "Autumn And Winter Casual cotton padded jacket",
    price: 499,
    rating: 4.5,
    reviews: 6789,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
  },
  {
    id: 2,
    title: "Mens Starry Shirt",
    subtitle: "Mens Starry Sky Printed Shirt 100% Cotton Fabric",
    price: 399,
    rating: 4.5,
    reviews: 120345,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
  },
  {
    id: 3,
    title: "Black Dress",
    subtitle: "Solid Black Dress for Women, Sexy Chain Shorts Ladies",
    price: 2000,
    rating: 4.0,
    reviews: 123456,
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500",
  },
  {
    id: 4,
    title: "Pink Embroidered Dress",
    subtitle: "EARTHEN Store Pink Embroidered Tiered Maxi Dress",
    price: 1900,
    rating: 4.8,
    reviews: 54678,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
  },
  {
    id: 5,
    title: "Flare Dress",
    subtitle: "Anthesia Black & Rust Orange Floral Print Tiered Midi",
    price: 1990,
    rating: 4.3,
    reviews: 35684,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
  },
  {
    id: 6,
    title: "Denim Dress",
    subtitle: "Blue cotton denim dress Look.2 Printed cotton dress",
    price: 999,
    rating: 4.4,
    reviews: 77156,
    image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=500",
  },
  {
    id: 7,
    title: "Nike Air Jordan",
    subtitle: "The classic Air Jordan 12 to create a shoe thats fresh",
    price: 4999,
    rating: 4.6,
    reviews: 523456,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
  },
  {
    id: 8,
    title: "Realme 7 Pro",
    subtitle: "6 GB RAM | 64 GB ROM | Expandable Upto 256 GB",
    price: 3499,
    rating: 4.4,
    reviews: 234567,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
  },
  {
    id: 9,
    title: "Sony PS4 Slim",
    subtitle: "Sony PS4 Console 1TB Slim with 3 Games: Gran Turismo",
    price: 1299,
    rating: 4.7,
    reviews: 35099,
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500",
  },
  {
    id: 10,
    title: "Black Jacket",
    subtitle: "This warm and comfortable jacket is great for winter",
    price: 2999,
    rating: 4.2,
    reviews: 223456,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
  },
  {
    id: 11,
    title: "Canon DSLR",
    subtitle: "D7200 Digital Camera (Black) in New Awesome Look",
    price: 26999,
    rating: 4.5,
    reviews: 123456,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
  },
  {
    id: 12,
    title: "Formal Shoes",
    subtitle: "George Walker Derby Brown Formal Shoes",
    price: 999,
    rating: 4.1,
    reviews: 124578,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500",
  },
];

export default function Trending() {
  const router = useRouter();

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
        <Text style={styles.headerTitle}>52,082+ Items</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>Sort</Text>
            <AntDesign name="down" size={14} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filter</Text>
            <Image
              source={require("../../../assets/images/filter.png")}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Products Grid */}
      <MasonryList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: product }) => (
          <TrendingProductCard
            product={product}
            imageStyle={{ height: product.id % 2 === 0 ? 180 : 220 }}
          />
        )}
      />
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
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
});
