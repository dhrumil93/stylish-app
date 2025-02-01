import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

class AuthService {
  // Store authentication token securely
  static async setAuthToken(token) {
    try {
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error storing auth token:', error);
      // Fallback to AsyncStorage if SecureStore fails
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  }

  // Get stored authentication token
  static async getAuthToken() {
    try {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      if (token && !(await this.isTokenExpired(token))) {
        return token;
      }
      return null;
    } catch (error) {
      console.error('Error getting auth token:', error);
      // Fallback to AsyncStorage
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (token && !(await this.isTokenExpired(token))) {
        return token;
      }
      return null;
    }
  }

  // Store user data
  static async setUserData(userData) {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

  // Get stored user data
  static async getUserData() {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  // Check if token is expired
  static async isTokenExpired(token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  // Clear all auth data on logout
  static async clearAuthData() {
    try {
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await AsyncStorage.multiRemove([USER_DATA_KEY]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }

  // Initialize auth state
  static async initializeAuth() {
    try {
      const token = await this.getAuthToken();
      const userData = await this.getUserData();

      if (token && userData) {
        return {
          isAuthenticated: true,
          token,
          userData,
        };
      }

      return {
        isAuthenticated: false,
        token: null,
        userData: null,
      };
    } catch (error) {
      console.error('Error initializing auth:', error);
      return {
        isAuthenticated: false,
        token: null,
        userData: null,
      };
    }
  }

  // Refresh token if needed
  static async refreshTokenIfNeeded(token) {
    try {
      if (await this.isTokenExpired(token)) {
        // Implement your token refresh logic here
        const response = await fetch('https://ecommerce-shop-qg3y.onrender.com/api/auth/refresh-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.success && data.token) {
          await this.setAuthToken(data.token);
          return data.token;
        }
        return null;
      }
      return token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }
}

export default AuthService; 