import {COLORS} from '@/theme/colors';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  navActionContainer: {
    width: widthToRatio(360),
    height: heightToRatio(42),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    marginBottom: 5,
  },
  navAction: {
    width: widthToRatio(180),
    height: heightToRatio(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedNavAction: {
    backgroundColor: COLORS.aliceBlue,
    borderColor: COLORS.opalgreen,
    borderBottomWidth: 2,
  },
});
