import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  static async registerForPushNotifications() {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        throw new Error('Permission not granted for notifications');
      }

      // Get the token that uniquely identifies this device
      const expoPushToken = await Notifications.getExpoPushTokenAsync({
        projectId: "4fcd7ad2-d878-49fe-af40-bdbdb5cba7ac" // Your Expo project ID
      });

      // Store the token locally
      await this.savePushToken(expoPushToken.data);

      // Configure Android channel
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      return expoPushToken.data;
    } catch (error) {
      console.error('Error registering for push notifications:', error);
      return null;
    }
  }

  static async savePushToken(token) {
    try {
      await AsyncStorage.setItem('pushToken', token);
    } catch (error) {
      console.error('Error saving push token:', error);
    }
  }

  static async getPushToken() {
    try {
      return await AsyncStorage.getItem('pushToken');
    } catch (error) {
      console.error('Error getting push token:', error);
      return null;
    }
  }

  // Send push notification using Expo's push service
  static async sendPushNotification(expoPushTokens, title, body, data = {}) {
    try {
      // Ensure tokens is an array
      const tokens = Array.isArray(expoPushTokens) ? expoPushTokens : [expoPushTokens];

      const messages = tokens.map(token => ({
        to: token,
        sound: 'default',
        title,
        body,
        data,
        priority: 'high',
      }));

      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages.length === 1 ? messages[0] : messages),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending push notification:', error);
      throw error;
    }
  }

  // Send promotional notification
  static async sendPromotionalNotification(title, message, discountCode = null) {
    try {
      const token = await this.getPushToken();
      if (!token) return;

      return await this.sendPushNotification(
        token,
        title,
        message,
        {
          type: 'promotion',
          discountCode
        }
      );
    } catch (error) {
      console.error('Error sending promotional notification:', error);
    }
  }

  // Send new product notification
  static async sendNewProductNotification(productName, productId, price) {
    try {
      const token = await this.getPushToken();
      if (!token) return;

      return await this.sendPushNotification(
        token,
        'New Product Alert! 🆕',
        `Check out our new product: ${productName}`,
        {
          type: 'new_product',
          productId,
          price
        }
      );
    } catch (error) {
      console.error('Error sending new product notification:', error);
    }
  }

  // Send flash sale notification
  static async sendFlashSaleNotification(title, discountPercent, endTime) {
    try {
      const token = await this.getPushToken();
      if (!token) return;

      return await this.sendPushNotification(
        token,
        '⚡ Flash Sale Alert!',
        `${title} - ${discountPercent}% off! Ends in ${endTime}`,
        {
          type: 'flash_sale',
          discountPercent,
          endTime
        }
      );
    } catch (error) {
      console.error('Error sending flash sale notification:', error);
    }
  }

  // Send order status notification
  static async sendOrderStatusNotification(orderId, status, estimatedDelivery = null) {
    try {
      const token = await this.getPushToken();
      if (!token) return;

      let title = 'Order Update';
      let message = `Order #${orderId} `;

      switch (status) {
        case 'confirmed':
          title = 'Order Confirmed! 🎉';
          message += 'has been confirmed';
          break;
        case 'shipped':
          title = 'Order Shipped! 📦';
          message += `is on the way${estimatedDelivery ? `. Estimated delivery: ${estimatedDelivery}` : ''}`;
          break;
        case 'delivered':
          title = 'Order Delivered! ✅';
          message += 'has been delivered';
          break;
        case 'cancelled':
          title = 'Order Cancelled ❌';
          message += 'has been cancelled';
          break;
        default:
          message += `status updated to: ${status}`;
      }

      return await this.sendPushNotification(
        token,
        title,
        message,
        {
          type: 'order_status',
          orderId,
          status,
          estimatedDelivery
        }
      );
    } catch (error) {
      console.error('Error sending order status notification:', error);
    }
  }

  // Local notifications
  static async scheduleLocalNotification(title, body, data = {}) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: null, // null means show immediately
      });
    } catch (error) {
      console.error('Error scheduling local notification:', error);
    }
  }

  static async showLoginNotification(userName) {
    await this.scheduleLocalNotification(
      'Welcome Back! 👋',
      `Successfully logged in as ${userName}`,
      { type: 'login_success' }
    );
  }

  static async showLogoutNotification() {
    await this.scheduleLocalNotification(
      'Goodbye! 👋',
      'You have been successfully logged out',
      { type: 'logout_success' }
    );
  }

  static async showOrderConfirmationNotification(orderId) {
    await this.scheduleLocalNotification(
      'Order Confirmed! 🎉',
      `Your order #${orderId} has been successfully placed`,
      { type: 'order_confirmation', orderId }
    );
  }

  // Set up notification listeners
  static setNotificationListeners(onNotification, onNotificationResponse) {
    const notificationListener = Notifications.addNotificationReceivedListener(
      onNotification
    );

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      onNotificationResponse
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }

  // Handle received notifications
  static async handleReceivedNotification(notification) {
    const { data } = notification.request.content;
    
    // Handle different types of notifications
    switch (data?.type) {
      case 'promotion':
        // Handle promotional notification
        break;
      case 'new_product':
        // Handle new product notification
        break;
      case 'flash_sale':
        // Handle flash sale notification
        break;
      case 'order_status':
        // Handle order status notification
        break;
      default:
        // Handle other notifications
        break;
    }
  }
}

export default NotificationService; 