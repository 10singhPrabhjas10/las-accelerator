import {getDeviceWidth} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  list: {
    position: 'absolute',
    bottom: 150,
    paddingLeft: '5%',
  },
  card: {minWidth: getDeviceWidth(0.7)},
});
