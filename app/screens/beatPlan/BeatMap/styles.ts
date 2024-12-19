import { COLORS } from '@/theme/colors';
import {getDeviceWidth, heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: COLORS.red,
    // borderWidth: 2,
    height: '79.8%',
    position: 'absolute',
    top: 156,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  markercontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  markerText: {
    color: COLORS.white,
    zIndex: 1,
    position: 'absolute',   
    textAlign:'center',
    fontSize: 12,
    bottom: 12,
  },
  list: {
    position: 'absolute',
    bottom: 70,
    marginHorizontal: '3%',
  },
  card: {minWidth: getDeviceWidth(0.7)},
});
