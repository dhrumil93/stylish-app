import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderSummary() {
  const router = useRouter();
  const { cartItems, selectedAddress, totalAmount } = useLocalSearchParams();
  const parsedCartItems = JSON.parse(cartItems);
  const parsedAddress = JSON.parse(selectedAddress);

  const handlePlaceOrder = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'Please login to place order');
        return;
      }

      // Ensure all required fields are present
      const validatedItems = parsedCartItems.map(item => ({
        productId: item.productId,
        productName: item.productName || 'Product',
        price: item.price,
        quantity: item.quantity,
        productDescription: item.productDescription || '',
        // Ensure productCategory is always set with a default value if not present
        productCategory: item.productCategory || 'Others',
        productSize: item.productSize || '',
        productColour: item.productColour || '',
        product_details: item.product_details || ''
      }));

      const orderData = {
        items: validatedItems,
        totalAmount: totalAmount,
        paymentMethod: 'Cash on Delivery',
        deliveryAddress: parsedAddress._id
      };

      console.log('Sending order data:', JSON.stringify(orderData, null, 2));

      const response = await fetch(
        'https://ecommerce-shop-qg3y.onrender.com/api/order/createOrder',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(orderData)
        }
      );

      const result = await response.json();
      console.log('Create order response:', result);

      if (result.success) {
        // Navigate to order success page with order details
        router.push({
          pathname: '/(screens)/order-success',
          params: {
            orderId: result.data._id,
            totalAmount: totalAmount
          }
        });
      } else {
        Alert.alert('Error', result.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={[styles.safeArea, {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }]}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Order Summary</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.content}>
            {/* Delivery Address */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
              <View style={styles.addressCard}>
                <Text style={styles.name}>{parsedAddress.fullName}</Text>
                <Text style={styles.phone}>{parsedAddress.phoneNumber}</Text>
                <Text style={styles.address}>
                  {parsedAddress.addressLine1}
                  {parsedAddress.addressLine2 ? `, ${parsedAddress.addressLine2}` : ''}
                  {parsedAddress.landmark ? `, ${parsedAddress.landmark}` : ''}
                  {`\n${parsedAddress.city}, ${parsedAddress.state} - ${parsedAddress.pincode}`}
                </Text>
              </View>
            </View>

            {/* Order Items */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order Items</Text>
              {parsedCartItems.map((item, index) => (
                <View key={index} style={styles.orderItem}>
                  <Text style={styles.productName}>{item.productName}</Text>
                  <View style={styles.itemDetails}>
                    <Text style={styles.detail}>Size: {item.productSize || 'N/A'}</Text>
                    <Text style={styles.detail}>Color: {item.productColour || 'N/A'}</Text>
                    <Text style={styles.detail}>Quantity: {item.quantity}</Text>
                  </View>
                  <Text style={styles.price}>₹{item.price * item.quantity}</Text>
                </View>
              ))}
            </View>

            {/* Price Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Details</Text>
              <View style={styles.priceDetails}>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Items Total</Text>
                  <Text style={styles.priceValue}>₹{totalAmount}</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Delivery</Text>
                  <Text style={[styles.priceValue, styles.free]}>Free</Text>
                </View>
                <View style={[styles.priceRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalValue}>₹{totalAmount}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  addressCard: {
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  orderItem: {
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  itemDetails: {
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F83758',
  },
  priceDetails: {
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  free: {
    color: '#00A36C',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    marginTop: 8,
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F83758',
  },
  placeOrderButton: {
    backgroundColor: '#F83758',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 