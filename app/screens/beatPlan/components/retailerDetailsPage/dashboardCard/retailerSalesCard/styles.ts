import {COLORS} from '@/theme/colors';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  cardSecondRow: {
    backgroundColor: COLORS.lightGreen,
    width: widthToRatio(312),
    height: heightToRatio(70),
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    bottom: 16.5,
  },
  mtdOrderContainer: {
    width: widthToRatio(83),
    height: heightToRatio(42),
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 40,
  },
  mtdOrderText: {
    fontWeight: 'bold',
  },
  totalOrdersContainer: {
    width: widthToRatio(83),
    height: heightToRatio(42),
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 40,
  },
  totalOrdersText: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
