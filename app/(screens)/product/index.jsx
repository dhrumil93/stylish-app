import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProductDetail() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('7 UK');

  const images = [
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80',
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
    'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80',
    'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&q=80',
    'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80',
  ];

  const sizes = ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton}>
            <AntDesign name="shoppingcart" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image Slider */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              const slide = Math.ceil(
                nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
              );
              if (currentImageIndex !== slide) {
                setCurrentImageIndex(slide);
              }
            }}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.productImage}
              />
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentImageIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          {/* Product Info */}
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>Nike Sneakers</Text>
            <Text style={styles.productSubtitle}>Vision Alta Men's Shoes Size (All Colours)</Text>
            
            {/* Rating */}
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                {[...Array(5)].map((_, index) => (
                  <AntDesign
                    key={index}
                    name={index < 4 ? "star" : "staro"}
                    size={16}
                    color="#FFD700"
                  />
                ))}
              </View>
              <Text style={styles.reviews}>56,890</Text>
            </View>

            {/* Price */}
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹1,500</Text>
              <Text style={styles.originalPrice}>₹2,999</Text>
              <Text style={styles.discount}>50% Off</Text>
            </View>

            {/* Size Selection */}
            <Text style={styles.sizeTitle}>Size: {selectedSize}</Text>
            <View style={styles.sizeContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSizeButton,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Product Details */}
            <Text style={styles.detailsTitle}>Product Details</Text>
            <Text style={styles.detailsText}>
              Perhaps the most iconic sneaker of all-time, this original "Chicago" 7 colorway is the cornerstone to any sneaker collection. Made famous in 1985 by Michael Jordan, the shoe has stood the test of time, becoming the most famous colorway of the Air Jordan 1. This 2015 release saw the ...
            </Text>

            {/* Store Info */}
            <View style={styles.storeInfo}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png' }}
                style={[styles.storeIcon, { tintColor: '#666' }]}
              />
              <Text style={styles.storeText}>Nearest Store</Text>
              <TouchableOpacity>
                <Text style={styles.vipText}>VIP</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.returnText}>Return policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.viewSimilarButton}>
            <Text style={styles.viewSimilarText}>View Similar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Compare</Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Info */}
        <View style={styles.deliveryInfo}>
          <Text style={styles.deliveryTitle}>Delivery in</Text>
          <Text style={styles.deliveryTime}>1 within Hour</Text>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/(screens)/home")}
          >
            <AntDesign name="home" size={24} color="#666" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <AntDesign name="hearto" size={24} color="#666" />
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
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  productImage: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    top: width - 30,
    alignSelf: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
  paginationDotActive: {
    width: 24,
    opacity: 1,
    borderRadius: 4,
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  productSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 16,
    color: '#F83758',
  },
  sizeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  selectedSizeButton: {
    backgroundColor: '#F83758',
    borderColor: '#F83758',
  },
  sizeText: {
    fontSize: 14,
    color: '#000',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  storeIcon: {
    width: 20,
    height: 20,
  },
  storeText: {
    fontSize: 14,
    color: '#666',
  },
  vipText: {
    fontSize: 14,
    color: '#F83758',
  },
  returnText: {
    fontSize: 14,
    color: '#F83758',
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  viewSimilarButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F83758',
  },
  viewSimilarText: {
    color: '#F83758',
    fontSize: 16,
    fontWeight: '600',
  },
  addToCartButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#F83758',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deliveryInfo: {
    backgroundColor: '#FFE8EC',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deliveryTitle: {
    fontSize: 14,
    color: '#666',
  },
  deliveryTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  cartButton: {
    marginTop: -20,
  },
  cartIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF4B6E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4B6E',
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
    color: '#666',
    marginTop: 4,
  },
  activeNavText: {
    color: '#FF4B6E',
  },
}); 