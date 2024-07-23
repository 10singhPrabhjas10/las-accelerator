import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  accordionHeadingStyle: {
    backgroundColor: COLORS.white,
    shadowRadius: 0,
    elevation: 0,
  },
  accordionTitleStyle: {
    color: COLORS.black,
    fontFamily: 'soleto_medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 20,
  },
  dateRangeFilter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  dropdown: {paddingHorizontal: 10},
  customRange: {marginTop: 20, marginLeft: 15},
});
export default styles;
