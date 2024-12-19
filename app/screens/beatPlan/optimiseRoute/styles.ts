import {COLORS} from '@/theme/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  parent: {
    width: '90%',
    height: '56%',
    alignSelf: 'center',
    paddingBottom: '15%',
  },
  updatingText: {
    color: COLORS.greyText,
    marginVertical: '5%',
    marginLeft: '2%',
    maxWidth: '90%',
  },
  updatingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
