import { Dimensions, PixelRatio } from 'react-native';

const windowSize = Dimensions.get('window');
const mockupWidth = 390;

export function aligned(pt: number) {
  if (windowSize.width > mockupWidth) {
    return PixelRatio.roundToNearestPixel(pt * (windowSize.width / mockupWidth));
  } else {
    return pt;
  }
}