import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  calendar: {height: 400, borderWidth: 1, borderColor: COLORS.borderGray},
  dateComponent: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    shadowColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    paddingVertical: 24,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dateText: {marginLeft: 24},
  pencilIcon: {marginRight: 16},
});

export default styles;
