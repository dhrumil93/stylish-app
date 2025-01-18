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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const productImages = [
  { id: 1, uri: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80' },
  { id: 2, uri: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80' },
  { id: 3, uri: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80' },
  { id: 4, uri: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800&q=80' },
];

const sizes = ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK'];

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('7 UK');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="shoppingcart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image Slider */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({nativeEvent}) => {
              const slide = Math.ceil(
                nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
              );
              if (activeImage !== slide) {
                setActiveImage(slide);
              }
            }}
          >
            {productImages.map((image, index) => (
              <Image
                key={image.id}
                source={{ uri: image.uri }}
                style={styles.productImage}
              />
            ))}
          </ScrollView>
          
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {productImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  activeImage === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.size}>Size: {selectedSize}</Text>
          <Text style={styles.title}>Nike Sneakers</Text>
          <Text style={styles.subtitle}>Vision Alta Men's Shoes Size (All Colours)</Text>
          
          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4].map((_, index) => (
                <AntDesign key={index} name="star" size={16} color="#FFD700" />
              ))}
              <AntDesign name="staro" size={16} color="#FFD700" />
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
          <View style={styles.sizeContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.sizeButtonActive,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextActive,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Product Details</Text>
            <Text style={styles.detailsText}>
              Perhaps the most iconic sneaker of all-time, this original "Chicago" 7 colorway is the cornerstone to any sneaker collection. Made famous in 1985 by Michael Jordan, the shoe has stood the test of time, becoming the most famous colorway of the Air Jordan 1. This 2015 release saw the...
            </Text>
            <TouchableOpacity>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>

          {/* Store Info */}
          <View style={styles.storeInfo}>
            <View style={styles.storeItem}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png' }}
                style={styles.storeIcon}
              />
              <Text style={styles.storeText}>Nearest Store</Text>
            </View>
            <View style={styles.storeItem}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2438/2438078.png' }}
                style={styles.storeIcon}
              />
              <Text style={styles.storeText}>VIP</Text>
            </View>
            <View style={styles.storeItem}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1067/1067555.png' }}
                style={styles.storeIcon}
              />
              <Text style={styles.storeText}>Return policy</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Go to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* Similar and Compare */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="eye" size={20} color="black" />
          <Text style={styles.actionButtonText}>View Similar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="swap" size={20} color="black" />
          <Text style={styles.actionButtonText}>Add to Compare</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  imageContainer: {
    width: width,
    height: width,
    position: 'relative',
  },
  productImage: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
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
  },
  productInfo: {
    padding: 16,
  },
  size: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    marginBottom: 16,
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
  sizeContainer: {
    marginBottom: 16,
  },
  sizeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginRight: 8,
  },
  sizeButtonActive: {
    backgroundColor: '#F83758',
    borderColor: '#F83758',
  },
  sizeText: {
    fontSize: 14,
    color: '#000',
  },
  sizeTextActive: {
    color: '#FFFFFF',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  moreText: {
    color: '#F83758',
    marginTop: 4,
  },
  storeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
  },
  storeItem: {
    alignItems: 'center',
  },
  storeIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    tintColor: '#666',
  },
  storeText: {
    fontSize: 12,
    color: '#666',
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E8E8E8',
  },
  cartButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F83758',
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#F83758',
    fontSize: 16,
    fontWeight: '600',
  },
  buyButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#F83758',
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#E8E8E8',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
}); 