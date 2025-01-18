import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Feather,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const categories = [
  { id: 1, name: "Beauty", icon: require("../../assets/images/beauty.png") },
  { id: 2, name: "Fashion", icon: require("../../assets/images/fashion.png") },
  { id: 3, name: "Kids", icon: require("../../assets/images/kids.png") },
  { id: 4, name: "Mens", icon: require("../../assets/images/mens.png") },
  { id: 5, name: "Womens", icon: require("../../assets/images/womens.png") },
  { id: 6, name: "Shoes", icon: require("../../assets/images/shoes.png") },
];

const bannerData = [
  {
    id: 1,
    title: "50-40% OFF",
    subtitle: "Now in (product)",
    description: "All colours",
    image: require("../../assets/images/banner.png"),
  },
  // Add more banners if needed
];

const dealOfTheDay = {
  timeRemaining: "22h 55m 20s",
};

const products = [
  {
    id: 1,
    title: "Women Printed Kurta",
    description: "Neque porro quisquam est qui dolorem ipsum quia",
    price: 1500,
    originalPrice: 2499,
    discount: "40% Off",
    rating: 4,
    reviews: 56890,
    image: { uri: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&q=80" }
  },
  {
    id: 2,
    title: "HRX by Hrithik Roshan",
    description: "Neque porro quisquam est qui dolorem ipsum quia",
    price: 2499,
    originalPrice: 4999,
    discount: "50% Off",
    rating: 4,
    reviews: 344567,
    image: { uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" }
  },
  {
    id: 3,
    title: "Black Dress",
    description: "Neque porro quisquam est qui dolorem ipsum quia",
    price: 2499,
    originalPrice: 4999,
    discount: "50% Off",
    rating: 4,
    reviews: 344567,
    image: { uri: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&q=80" }
  },
  {
    id: 4,
    title: "Pink Embroidered Dress",
    description: "Neque porro quisquam est qui dolorem ipsum quia",
    price: 1900,
    originalPrice: 3800,
    discount: "50% Off",
    rating: 4.8,
    reviews: 54678,
    image: { uri: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80" }
  },
  {
    id: 5,
    title: "Flare Dress",
    description: "Neque porro quisquam est qui dolorem ipsum quia",
    price: 1990,
    originalPrice: 3980,
    discount: "50% Off",
    rating: 4.3,
    reviews: 35684,
    image: { uri: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80" }
  },
  {
    id: 6,
    title: "Denim Dress",
    description: "Neque porro quisquam est qui dolorem ipsum quia",
    price: 999,
    originalPrice: 1999,
    discount: "50% Off",
    rating: 4.4,
    reviews: 77156,
    image: { uri: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80" }
  },
  {
    id: 7,
    title: "Nike Air Jordan",
    description: "Neque porro quisquam est qui dolorem ipsum quia",
    price: 4999,
    originalPrice: 9999,
    discount: "50% Off",
    rating: 4.6,
    reviews: 523456,
    image: { uri: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80" }
  },
 ];

const specialOffer = {
  title: "Special Offers",
  emoji: "😱",
  description: "We make sure you get the offer you need at best prices",
  icon: require("../../assets/images/special_offer.png"),
};

const flatAndHeels = {
  title: "Flat and Heels",
  description: "Stand a chance to get rewarded",
  image: require("../../assets/images/heels.png"),
};

const trendingProducts = [
  {
    id: 1,
    title: "IWC Schaffhausen 2021 Pilot's Watch",
    subtitle: "SIHH 2019 44mm",
    price: 650,
    originalPrice: 1599,
    discount: "60% off",
    image: { uri: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80" }
  },
  {
    id: 2,
    title: "Labbin White Sneakers",
    subtitle: "For Men and Female",
    price: 650,
    originalPrice: 1250,
    discount: "70% off",
    image: { uri: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80" }
  },
  {
    id: 3,
    title: "Mammon Women's Handbag",
    subtitle: "(Set of 3, Grey)",
    price: 750,
    originalPrice: 1999,
    discount: "65% off",
    image: { uri: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80" }
  },
];

const newArrivals = {
  title: "New Arrivals",
  subtitle: "Summer' 25 Collections",
  image: require("../../assets/images/summer_sale.png"),
};

const sponsored = {
  title: "Sponserd",
  image: require("../../assets/images/sponsored_shoes.jpg"),
  discount: "UP TO 50% OFF",
  link: "up to 50% Off",
};

export default function Home() {
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
              source={require("../../assets/images/group34010.png")}
              style={styles.logoIcon}
            />
            <Text style={styles.logoText}>Stylish</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(screens)/checkout/')}>
            <Image
              source={require("../../assets/images/profile.png")}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
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
          <View style={styles.subHeader}>
            <Text style={styles.headerTitle}>All Featured</Text>
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
          {/* Categories */}
          <View style={styles.categoriesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.categoryItem}>
                  <Image source={category.icon} style={styles.categoryIcon} />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Banner Slider */}
          <View style={styles.bannerContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {bannerData.map((banner) => (
                <View key={banner.id} style={styles.bannerSlide}>
                  <ImageBackground
                    source={banner.image}
                    style={styles.bannerImage}
                    imageStyle={{ borderRadius: 12 }}
                  >
                    <View style={styles.bannerContent}>
                      <Text style={styles.bannerTitle}>{banner.title}</Text>
                      <Text style={styles.bannerSubtitle}>
                        {banner.subtitle}
                      </Text>
                      <Text style={styles.bannerDescription}>
                        {banner.description}
                      </Text>
                      <TouchableOpacity style={styles.shopNowButton}>
                        <Text style={styles.shopNowText}>Shop Now</Text>
                        <AntDesign
                          name="arrowright"
                          size={16}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
              ))}
            </ScrollView>
            <View style={styles.paginationDots}>
              {bannerData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === 0 && styles.activeDot, // Add state if multiple banners
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Deal of the Day */}
          <View style={styles.dealContainer}>
            <View style={styles.dealHeader}>
              <View style={styles.dealTitleContainer}>
                <Text style={styles.dealTitle}>Deal of the Day</Text>
                <View style={styles.timerContainer}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={16}
                    color="#FFFFFF"
                  />
                  <Text style={styles.timerText}>
                    {dealOfTheDay.timeRemaining} remaining
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View all</Text>
                <AntDesign name="arrowright" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Products Section */}
          <View style={styles.productsSection}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsScrollContainer}
            >
              {products.map((product) => (
                <TouchableOpacity 
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => router.push(`/product/${product.id}`)}
                >
                  <Image source={product.image} style={styles.productImage} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productTitle} numberOfLines={1}>
                      {product.title}
                    </Text>
                    <Text style={styles.productDescription} numberOfLines={2}>
                      {product.description}
                    </Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>₹{product.price}</Text>
                      <Text style={styles.originalPrice}>
                        ₹{product.originalPrice}
                      </Text>
                      <Text style={styles.discount}>{product.discount}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                      <View style={styles.stars}>
                        {[...Array(5)].map((_, index) => (
                          <AntDesign
                            key={index}
                            name={index < product.rating ? "star" : "staro"}
                            size={16}
                            color={index < product.rating ? "#FFD700" : "#666"}
                          />
                        ))}
                      </View>
                      <Text style={styles.reviews}>{product.reviews}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Special Offers Section */}
          <View style={styles.specialOfferContainer}>
            <View style={styles.specialOfferContent}>
              <Image
                source={specialOffer.icon}
                style={styles.specialOfferIcon}
              />
              <View style={styles.specialOfferTextContainer}>
                <View style={styles.specialOfferHeader}>
                  <Text style={styles.specialOfferTitle}>
                    {specialOffer.title}
                  </Text>
                  <Text style={styles.specialOfferEmoji}>
                    {specialOffer.emoji}
                  </Text>
                </View>
                <Text style={styles.specialOfferDescription}>
                  {specialOffer.description}
                </Text>
              </View>
            </View>
          </View>

          {/* Flat and Heels Section */}
          <View style={styles.flatAndHeelsContainer}>
            {/* Background with Gradient and Pattern */}
            <View style={styles.heelsBackground}>
              <LinearGradient
                colors={["#EFAD18", "#F8D7B4"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.heelsGradient}
              />
              <Image
                source={require("../../assets/images/horizontal_parts.png")}
                style={styles.heelsPattern}
              />
            </View>

            {/* Content */}
            <View style={styles.heelsContent}>
              <Image
                source={require("../../assets/images/heels.png")}
                style={styles.heelsImage}
              />
              <View style={styles.heelsTextContainer}>
                <Text style={styles.heelsTitle}>Flat and Heels</Text>
                <Text style={styles.heelsDescription}>
                  Stand a chance to get rewarded
                </Text>
                <TouchableOpacity style={styles.visitButton}>
                  <Text style={styles.visitButtonText}>Visit now</Text>
                  <AntDesign name="arrowright" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Trending Products Section */}
          <View style={styles.trendingContainer}>
            {/* Header Section */}
            <View style={styles.trendingHeader}>
              <View style={styles.trendingTitleContainer}>
                <Text style={styles.trendingTitle}>Trending Products</Text>
                <View style={styles.dateContainer}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={18}
                    color="#FFFFFF"
                  />
                  <Text style={styles.dateText}>Last Date 29/02/22</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => router.push("/(screens)/trending/")}
              >
                <Text style={styles.viewAllText}>View all</Text>
                <AntDesign name="arrowright" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Trending Products Cards */}
          <View style={styles.trendingCardsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.trendingScrollContainer}
            >
              {trendingProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.trendingProductCard}
                >
                  <Image
                    source={product.image}
                    style={styles.trendingProductImage}
                  />
                  <View style={styles.trendingProductInfo}>
                    <Text style={styles.trendingProductTitle} numberOfLines={2}>
                      {product.title}
                    </Text>
                    <Text style={styles.trendingProductSubtitle}>
                      {product.subtitle}
                    </Text>
                    <View style={styles.trendingPriceContainer}>
                      <Text style={styles.trendingPrice}>₹{product.price}</Text>
                      <Text style={styles.trendingOriginalPrice}>
                        ₹{product.originalPrice}
                      </Text>
                      <Text style={styles.trendingDiscount}>
                        {product.discount}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* New Arrivals Section */}
          <View style={styles.newArrivalsContainer}>
            <Image source={newArrivals.image} style={styles.newArrivalsImage} />
            <View style={styles.newArrivalsContent}>
              <View style={styles.newArrivalsTextContainer}>
                <Text style={styles.newArrivalsTitle}>{newArrivals.title}</Text>
                <Text style={styles.newArrivalsSubtitle}>
                  {newArrivals.subtitle}
                </Text>
              </View>
              <TouchableOpacity style={styles.newArrivalsButton}>
                <Text style={styles.newArrivalsButtonText}>View all</Text>
                <AntDesign name="arrowright" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sponsored Section */}
          <View style={styles.sponsoredContainer}>
            <Text style={styles.sponsoredTitle}>{sponsored.title}</Text>
            <TouchableOpacity style={styles.sponsoredCard}>
              <Image source={sponsored.image} style={styles.sponsoredImage} />
              <View style={styles.discountOverlay}>
                <Text style={styles.discountText}>{sponsored.discount}</Text>
              </View>
              <View style={styles.sponsoredFooter}>
                <Text style={styles.sponsoredLink}>{sponsored.link}</Text>
                <AntDesign name="right" size={20} color="#000" />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/(screens)/home")}
          >
            <AntDesign name="home" size={24} color="#FF4B6E" />
            <Text style={[styles.navText,styles.activeNavText]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
            <AntDesign name="hearto" size={24} color="#666" />
            <Text style={[styles.navText]}>Wishlist</Text>
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
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  menuIcon: {
    width: 32,
    height: 32,
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
    // tintColor: '#F83758',
  },
  logoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4392F9",
    letterSpacing: 0.5,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
  },
  categoryText: {
    fontSize: 12,
    color: "#333",
  },
  bannerContainer: {
    marginHorizontal: 16,
    marginTop: 6,
    height: 180,
    // marginBottom: 2,
  },
  bannerSlide: {
    width: width - 32, // Subtract horizontal margin
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFB6C1", // Light pink background
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  bannerDescription: {
    fontSize: 12,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  shopNowButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  shopNowText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    marginRight: 8,
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeDot: {
    opacity: 0.5,
    width: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  viewAll: {
    fontSize: 14,
    color: "#FF4B6E",
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
    shadowColor: "#FFFFFF",
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
  dealContainer: {
    backgroundColor: "#4A8CFF",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    // marginBottom: 2,
  },
  dealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dealTitleContainer: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginLeft: 4,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  viewAllText: {
    color: "#4A8CFF",
    fontSize: 12,
    fontWeight: "600",
    marginRight: 4,
  },
  productsSection: {
    marginTop: 16,
  },
  productsScrollContainer: {
    paddingHorizontal: 16,
  },
  productCard: {
    width: width * 0.6,
    height: "241px",
    marginRight: 16,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#000",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discount: {
    fontSize: 14,
    color: "#FF4B6E",
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
    marginRight: 8,
  },
  reviews: {
    fontSize: 12,
    color: "#666",
  },
  specialOfferContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  specialOfferContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  specialOfferIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 16,
  },
  specialOfferTextContainer: {
    flex: 1,
  },
  specialOfferHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  specialOfferTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginRight: 8,
  },
  specialOfferEmoji: {
    fontSize: 14,
  },
  specialOfferDescription: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
  },
  flatAndHeelsContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    height: 180,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  heelsBackground: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  heelsGradient: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 11,
    height: "100%",
  },
  heelsPattern: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 77.77,
    height: "100%",
    resizeMode: "cover",
  },
  heelsContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  heelsImage: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: "contain",
    marginLeft: 20,
    transform: [{ scale: 1.2 }], // Makes the image slightly larger
    zIndex: 2,
  },
  heelsTextContainer: {
    flex: 1,
    paddingHorizontal: 4,
    alignItems: "flex-end",
  },
  heelsTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
    marginRight: 24,
    lineHeight: 20,
    fontWeight: "500",
  },
  heelsDescription: {
    fontSize: 10,
    color: "#666",
    marginBottom: 16,
    marginRight: 56,
    fontWeight: "400",
    lineHeight: 16,
  },
  visitButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF4B6E",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 20,
    borderRadius: 4,
  },
  visitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginRight: 8,
  },
  trendingContainer: {
    backgroundColor: "#FD6E87",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  trendingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trendingTitleContainer: {
    flex: 1,
  },
  trendingTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 8,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  viewAllText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
  },
  trendingCardsContainer: {
    marginTop: -2, // Overlap with the header container
    paddingBottom: 8,
  },
  trendingScrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  trendingProductCard: {
    width: width * 0.4,
    marginRight: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
  },
  trendingProductImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  trendingProductInfo: {
    padding: 12,
  },
  trendingProductTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
    lineHeight: 20,
  },
  trendingProductSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  trendingPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  trendingPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginRight: 8,
  },
  trendingOriginalPrice: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  trendingDiscount: {
    fontSize: 14,
    color: "#FF4B6E",
    fontWeight: "500",
  },
  newArrivalsContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newArrivalsImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  newArrivalsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  newArrivalsTextContainer: {
    flex: 1,
  },
  newArrivalsTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
    lineHeight: 22,
  },
  newArrivalsSubtitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "400",
  },
  newArrivalsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F83758",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  newArrivalsButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
  },
  sponsoredContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  sponsoredTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
    marginBottom: 12,
  },
  sponsoredCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sponsoredImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  discountOverlay: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  discountText: {
    color: "black",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  sponsoredFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  sponsoredLink: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
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
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
});
