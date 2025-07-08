import {StyleSheet} from 'react-native';
import {COLORS} from '@/theme/colors';

export const leadsStyles = StyleSheet.create({
  contactRow: {
    flexDirection: 'row',
    marginLeft: 25,
    gap: 27,
  },
  contactTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    color: COLORS.blue,
  },
});
