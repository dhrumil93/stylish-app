import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function CustomStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
} 