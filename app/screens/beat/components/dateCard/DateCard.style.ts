import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderColor: COLORS.lightGrey2,
    borderWidth: 1,
    borderRadius: 8,
    height: 52,
    alignItems: 'center',
    marginTop: 16,
  },
  dateIcon: {marginHorizontal: 16},
  dateText: {color: COLORS.grey2},
});
export default styles;
