import { Platform } from 'react-native';

export function isAboveIOS14() {
  if (Platform.OS === 'ios') {
    const majorVersionIOS = parseInt(Platform.Version, 10);
    if (majorVersionIOS >= 14) {
      return true;
    }
  }
  return false;
}
