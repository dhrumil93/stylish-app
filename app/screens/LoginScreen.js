import NotificationService from '../services/NotificationService';

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    // Initialize notifications when the screen loads
    NotificationService.registerForPushNotifications();
  }, []);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await signIn(identifier, password);
      if (response.success) {
        // Show login notification
        await NotificationService.showLoginNotification(identifier);
        navigation.replace('Home');
      } else {
        setErrorMsg(response.message || 'Sign in failed');
      }
    } catch (error) {
      setErrorMsg(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // ... existing code ...
}; 