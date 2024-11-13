import {COLORS} from '@/theme/colors';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  beatListContainer: {
    alignItems: 'center',
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: heightToRatio(15),
  },
});
