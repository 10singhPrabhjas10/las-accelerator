import {COLORS} from '@/theme/colors';
import {heightToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  parent: {
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: '5%',
  },
  headLine: {flexDirection: 'row', justifyContent: 'space-between'},
  fontSize: {
    fontSize: heightToRatio(16),
  },
  fontSize12: {
    fontSize: heightToRatio(12),
  },
  incentiveTextColor: {
    color: COLORS.dDarkGreen,
    fontSize: 10,
  },
  incentiveParent: {
    backgroundColor: COLORS.pastry,
    paddingHorizontal: '5%',
    borderRadius: 8,
    marginVertical: '2%',
    paddingVertical: '2%',
  },
  frameParent: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLORS.backGroundColor,
    paddingVertical: '2%',
  },
  firstPart: {flex: 0.35},
  secondPart: {
    flexDirection: 'row',
    flex: 0.65,
    justifyContent: 'space-between',
  },
  changeBackground: {
    borderRadius: 20,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
