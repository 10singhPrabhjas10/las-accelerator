import {COLORS} from '@/theme/colors';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  cardContainer: {
    width: widthToRatio(312),
    height: heightToRatio(207),
    marginHorizontal: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFirstRow: {
    width: widthToRatio(312),
    height: heightToRatio(91),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    position: 'relative',
    bottom: 17,
  },
  gridvector: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  firstRowContent: {
    width: widthToRatio(265),
    height: heightToRatio(60),
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  firstRowContentImg: {
    flexDirection: 'row',
  },
  chartpie: {
    paddingLeft: 2,
  },
  arrow: {
    position: 'relative',
    top: 6,
    left: 230,
  },
  firstRowContentText: {
    padding: 4,
    fontWeight: 'bold',
  },
  cardThirdRow: {
    width: widthToRatio(309),
    height: heightToRatio(27),
    padding: 2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    bottom: 5,
  },
});
