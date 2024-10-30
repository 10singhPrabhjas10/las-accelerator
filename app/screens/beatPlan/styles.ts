import {COLORS} from '@/theme/colors';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Button: {
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: heightToRatio(30),
  },
  box: {
    width: widthToRatio(40),
    aspectRatio: 1,
    borderRadius: 8,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.dDarkGreen,
  },
  marginRightZero: {
    marginRight: 0,
  },
  whiteBackground: {
    backgroundColor: COLORS.white,
  },
  trasparentBackground: {
    backgroundColor: COLORS.trasparent,
  },
  Selector: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layout: {
    alignItems: 'center',
  },
});
