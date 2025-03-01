import React, { useState, useEffect } from "react";
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
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Feather,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import Categories from "../components/Categories";

const HEADER_HEIGHT = 56;
const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
const { width } = Dimensions.get("window");

const categories = [
  {
    id: 1,
    name: "Beauty",
    icon: {
      uri: "https://media.istockphoto.com/id/1296705483/photo/make-up-products-prsented-on-white-podiums-on-pink-pastel-background.jpg?s=2048x2048&w=is&k=20&c=GQEoBXmHX4kUlZCB0BwPvRqbKu0Bfi1yB8WvA_fG59w=",
    },
  },
  {
    id: 2,
    name: "Fashion",
    icon: {
      uri: "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 3,
    name: "Kids",
    icon: {
      uri: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 4,
    name: "Mens",
    icon: {
      uri: "https://plus.unsplash.com/premium_photo-1669688174106-05f7334f1e64?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 5,
    name: "Womens",
    icon: {
      uri: "https://images.unsplash.com/photo-1728280098871-bfa0fafc17bf?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 6,
    name: "Shoes",
    icon: {
      uri: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
];

const bannerData = [
  {
    id: 1,
    title: "50-40% OFF",
    subtitle: "Now in Clothes",
    description: "All Brands",
    image: {
      uri: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 2,
    title: "FLAT 30% OFF",
    subtitle: "Now in Watches",
    description: "Titan,Fossil & many more",
    image: {
      uri: "https://media.istockphoto.com/id/976983930/photo/watch.jpg?s=1024x1024&w=is&k=20&c=2DCAsylEpxsfgd6wamXHVd2OgbnVu6FN_pTxAm5zr-Y=",
    },
  },
  {
    id: 3,
    title: "50-40% OFF",
    subtitle: "Now in Shoes",
    description: "On Nike,USPA & Many more",
    image: {
      uri: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  // Add more banners if needed
];

const dealOfTheDay = {
  timeRemaining: "22h 55m 20s",
};

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
    image: {
      uri: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80",
    },
  },
  {
    id: 2,
    title: "Labbin White Sneakers",
    subtitle: "For Men and Female",
    price: 650,
    originalPrice: 1250,
    discount: "70% off",
    image: {
      uri: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    },
  },
  {
    id: 3,
    title: "Mammon Women's Handbag",
    subtitle: "(Set of 3, Grey)",
    price: 750,
    originalPrice: 1999,
    discount: "65% off",
    image: {
      uri: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    },
  },
];

const newArrivals = {
  title: "New Arrivals",
  subtitle: "Summer' 25 Collections",
  image: {
    uri: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
};

const sponsored = {
  title: "Sponserd",
  image: require("../../assets/images/sponsored_shoes.jpg"),
  discount: "UP TO 50% OFF",
  link: "up to 50% Off",
};

export default function Home() {
  const router = useRouter();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
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
      <StatusBar 
        translucent 
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Header />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Feather name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search any Product..."
              placeholderTextColor="#666"
            />
            <TouchableOpacity>
              <Feather name="mic" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <Categories />

        {/* Banner Slider */}
        <View style={styles.bannerContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              const slide = Math.ceil(
                nativeEvent.contentOffset.x /
                  nativeEvent.layoutMeasurement.width
              );
              if (currentBannerIndex !== slide) {
                setCurrentBannerIndex(slide);
              }
            }}
            scrollEventThrottle={16}
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
                  index === currentBannerIndex && styles.activeDot,
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
              <AntDesign name="arrowright" size={16} color="#4A8CFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.productsSection}>
          {loading ? (
            <ActivityIndicator size="large" color="#F83758" style={styles.loader} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsScrollContainer}
            >
              {Array.isArray(products) && products.map((product) => (
                <TouchableOpacity 
                  key={product?._id} 
                  style={styles.productCard}
                  onPress={() => router.push({
                    pathname: "/(screens)/product",
                    params: { id: product?._id }
                  })}
                >
                  <Image 
                    source={{ uri: product?.product_images?.[0] || 'https://via.placeholder.com/200' }} 
                    style={styles.productImage} 
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.productTitle} numberOfLines={1}>
                      {product?.name || 'Product Name'}
                    </Text>
                    <Text style={styles.productDescription} numberOfLines={2}>
                      {product?.description || 'No description available'}
                    </Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>₹{product?.price || 0}</Text>
                      {product?.originalPrice && (
                        <>
                          <Text style={styles.originalPrice}>
                            ₹{product.originalPrice}
                          </Text>
                          <Text style={styles.discount}>
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                          </Text>
                        </>
                      )}
                    </View>
                    <View style={styles.ratingContainer}>
                      <View style={styles.stars}>
                        {[...Array(5)].map((_, index) => (
                          <AntDesign
                            key={index}
                            name={index < Math.floor(product?.rating || 0) ? "star" : "staro"}
                            size={16}
                            color="#FFD700"
                          />
                        ))}
                      </View>
                      <Text style={styles.reviews}>
                        {product?.reviews?.length || 0}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
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
              <Text style={styles.viewAllText1}>View all</Text>
              <AntDesign name="arrowright" size={16} color="#FF4B6E" />
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
                  <Text
                    style={styles.trendingProductTitle}
                    numberOfLines={2}
                  >
                    {product.title}
                  </Text>
                  <Text style={styles.trendingProductSubtitle}>
                    {product.subtitle}
                  </Text>
                  <View style={styles.trendingPriceContainer}>
                    <Text style={styles.trendingPrice}>
                      ₹{product.price}
                    </Text>
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
          <Image
            source={newArrivals.image}
            style={styles.newArrivalsImage}
          />
          <View style={styles.newArrivalsContent}>
            <View style={styles.newArrivalsTextContainer}>
              <Text style={styles.newArrivalsTitle}>
                {newArrivals.title}
              </Text>
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

      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    marginTop: HEADER_HEIGHT + STATUSBAR_HEIGHT,
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 80,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    paddingVertical: 4,
  },
  bannerContainer: {
    marginHorizontal: 16,
    marginTop: 6,
    height: 180,
  },
  bannerSlide: {
    width: width - 32,
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFB6C1",
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
    backgroundColor: "#C4C4C4",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#C4C4C4",
    width: 24,
    borderRadius: 4,
  },
  dealContainer: {
    backgroundColor: "#4392F9",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 2,
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
  viewAllText1: {
    color: "#FF4B6E",
    fontSize: 12,
    fontWeight: "600",
    marginRight: 4,
  },
  productsSection: {
    marginTop: 16,
  },
  productsScrollContainer: {
    paddingHorizontal: 16,
    paddingRight: 2,
  },
  productCard: {
    width: width * 0.5,
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
    width: "100%",
    height: 160,
    resizeMode: "contain",
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#000",
  },
  productDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
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
    transform: [{ scale: 1.2 }],
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
    backgroundColor: "#FF4B6E",
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
  trendingCardsContainer: {
    marginTop: -2,
    paddingBottom: 8,
  },
  trendingScrollContainer: {
    paddingHorizontal: 16,
    paddingRight: 2,
    paddingTop: 16,
  },
  trendingProductCard: {
    width: width * 0.35,
    height: width * 0.6,
    marginRight: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  trendingProductImage: {
    width: "100%",
    height: width * 0.35,
    resizeMode: "cover",
    borderRadius: 8,
  },
  trendingProductInfo: {
    padding: 8,
    flex: 1,
    justifyContent: "space-between",
  },
  trendingProductTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
    lineHeight: 18,
  },
  trendingProductSubtitle: {
    fontSize: 11,
    color: "#666",
    marginBottom: 6,
  },
  trendingPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  trendingPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginRight: 6,
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
    marginTop: 12,
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
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: "#F83758",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
  },
});
