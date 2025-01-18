import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import MasonryList from "@react-native-seoul/masonry-list";

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/7216/7216128.png",
              }}
              style={[styles.menuIcon, { tintColor: "#000" }]}
            />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/group34010.png")}
              style={styles.logoIcon}
            />
            <Text style={styles.logoText}>Stylish</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(screens)/checkout/')}>
            <Image
              source={require("../../../assets/images/profile.png")}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </View>

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
            <TouchableOpacity 
              style={styles.productCard}
              onPress={() => router.push('/product')}
            >
              <Image
                source={{ uri: product.image }}
                style={[
                  styles.productImage,
                  { height: product.id % 2 === 0 ? 180 : 220 }, // Alternate heights
                ]}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={1}>
                  {product.title}
                </Text>
                <Text style={styles.productSubtitle} numberOfLines={2}>
                  {product.subtitle}
                </Text>
                <Text style={styles.productPrice}>
                  ₹{product.price.toLocaleString()}
                </Text>
                <View style={styles.ratingContainer}>
                  <View style={styles.stars}>
                    {[...Array(5)].map((_, index) => (
                      <AntDesign
                        key={index}
                        name={
                          index < Math.floor(product.rating) ? "star" : "staro"
                        }
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
          )}
        />

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/(screens)/home")}
          >
            <AntDesign name="home" size={24} color="#FF4B6E" />
            <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
            <AntDesign name="hearto" size={24} color="#000" />
            <Text style={styles.navText}>Wishlist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navItem, styles.cartButton]}>
            <View style={styles.cartIconContainer}>
              <Feather name="shopping-cart" size={24} color="#FFF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Feather name="search" size={24} color="#666" />
            <Text style={styles.navText}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="settings-outline" size={24} color="#666" />
            <Text style={styles.navText}>Setting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4392F9",
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sortText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    height: 48,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  micIcon: {
    width: 20,
    height: 20,
  },
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  cartButton: {
    marginTop: -20,
  },
  cartIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF4B6E",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF4B6E",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  activeNavText: {
    color: "#FF4B6E",
  },
  productsContainer: {
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
});
