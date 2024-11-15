import {getDeviceWidth} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  list: {
    position: 'absolute',
    bottom: 95,
    marginHorizontal: '3%',
  },
  card: {minWidth: getDeviceWidth(0.7)},
});
