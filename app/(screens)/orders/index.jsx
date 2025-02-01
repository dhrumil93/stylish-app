import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        setError('Please login to view orders');
        setLoading(false);
        return;
      }

      const response = await fetch(
        'https://ecommerce-shop-qg3y.onrender.com/api/order/displayAllOrder',
        {
          headers: {
            'Authorization': token
          }
        }
      );

      const result = await response.json();
      console.log('Orders response:', result);

      if (result.success) {
        setOrders(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('API Error:', error);
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return '#666';
    
    switch (status.toLowerCase()) {
      case 'processing':
        return '#F83758';
      case 'shipped':
        return '#2196F3';
      case 'delivered':
        return '#00A36C';
      default:
        return '#666';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F83758" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={[styles.safeArea]}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Orders</Text>
          </View>

          {orders.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No orders found</Text>
            </View>
          ) : (
            <ScrollView 
              style={styles.ordersList}
              contentContainerStyle={styles.ordersListContent}
              showsVerticalScrollIndicator={false}
            >
              {orders.map((order) => (
                <View key={order._id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>Order #{order._id?.slice(-8)}</Text>
                    <Text style={[
                      styles.orderStatus,
                      { color: getStatusColor(order.orderStatus) }
                    ]}>
                      {order.orderStatus || 'Processing'}
                    </Text>
                  </View>

                  <Text style={styles.orderDate}>
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </Text>

                  {order.items?.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <Image
                        source={{
                          uri: `https://ecommerce-shop-qg3y.onrender.com/api/product/displayImage/${item.productId}`
                        }}
                        style={styles.productImage}
                      />
                      <View style={styles.itemDetails}>
                        <Text style={styles.productName}>{item.productName || 'Product'}</Text>
                        <Text style={styles.itemInfo}>
                          Size: {item.size || 'N/A'} • Color: {item.colour || 'N/A'}
                        </Text>
                        <Text style={styles.quantity}>Quantity: {item.quantity || 1}</Text>
                        <Text style={styles.itemPrice}>₹{item.price * (item.quantity || 1)}</Text>
                      </View>
                    </View>
                  ))}

                  <View style={styles.orderFooter}>
                    <View style={styles.deliveryAddress}>
                      <Text style={styles.addressLabel}>Delivery Address:</Text>
                      <Text style={styles.address}>
                        {order.deliveryAddress?.addressLine1 || 'N/A'}{'\n'}
                        {order.deliveryAddress?.addressLine2 ? `${order.deliveryAddress.addressLine2}, ` : ''}
                        {order.deliveryAddress?.city || 'N/A'}{'\n'}
                        {order.deliveryAddress?.state || 'N/A'}, {order.deliveryAddress?.pincode || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.totalAmount}>
                      <Text style={styles.totalLabel}>Total Amount:</Text>
                      <Text style={styles.totalValue}>₹{order.totalAmount || 0}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const BOTTOM_NAV_HEIGHT = 65;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#F83758',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  ordersList: {
    flex: 1,
    padding: 16,
  },
  ordersListContent: {
    paddingBottom: BOTTOM_NAV_HEIGHT + 16,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F83758',
  },
  orderFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  deliveryAddress: {
    marginBottom: 12,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  totalAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F83758',
  },
}); 