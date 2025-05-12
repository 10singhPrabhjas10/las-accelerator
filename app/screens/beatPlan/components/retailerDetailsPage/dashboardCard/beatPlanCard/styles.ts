import {COLORS} from '@/theme/colors';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  cardSecondRow: {
    backgroundColor: COLORS.lightGreen,
    width: widthToRatio(312),
    height: heightToRatio(70),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    bottom: 16.5,
  },
  totalOrderContainer: {
    width: widthToRatio(83),
    height: heightToRatio(42),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  totalOrderText: {
    fontWeight: 'bold',
  },
  totalBeatsContainer: {
    width: widthToRatio(83),
    height: heightToRatio(42),
    marginHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalBeatsText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalSalesContainer: {
    width: widthToRatio(83),
    height: heightToRatio(42),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  totalSalesText: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
