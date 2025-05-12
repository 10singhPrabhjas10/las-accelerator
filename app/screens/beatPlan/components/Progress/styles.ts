import {COLORS} from '@/theme/colors';
import {heightToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  verticalLine: {
    borderWidth: 1,
    opacity: 0.2,
    backgroundColor: COLORS.white,
    height: '70%',
    alignSelf: 'center',
  },
  text16: {
    fontSize: heightToRatio(16),
    color: COLORS.white,
  },
});
