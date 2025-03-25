// This is a simple script to send notifications using Expo's push service
import axios from 'axios';

async function sendNotification() {
  try {
    // Get device tokens from API
    console.log('Fetching device tokens...');
    const tokenResponse = await axios.get('https://ecommerce-shop-qg3y.onrender.com/api/user/getToken');

    if (!tokenResponse.data.success) {
      throw new Error('Failed to get device tokens: ' + tokenResponse.data.message);
    }

    // Filter out tokens that exist
    const deviceTokens = tokenResponse.data.data
      .filter(item => item.device_token)
      .map(item => item.device_token);

    console.log('Device tokens fetched:', deviceTokens);

    if (deviceTokens.length === 0) {
      console.log('No valid device tokens found');
      return;
    }

    // Send notification to all tokens
    const notifications = deviceTokens.map(token => ({
      to: token,
      sound: 'default',
      title: 'Test Notification',
      body: 'This is a test notification!',
      data: { type: 'test' },
    }));

    const notificationResponse = await axios.post('https://exp.host/--/api/v2/push/send', notifications);
    console.log('Notifications sent successfully:', notificationResponse.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Run the script
sendNotification(); 