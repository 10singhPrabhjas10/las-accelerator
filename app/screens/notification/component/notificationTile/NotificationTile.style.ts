import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 20,
    alignItems: 'stretch',
  },
  containerIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  icon: {
    width: 20,
    height: 20,
  },
  disabledIcon: {
    backgroundColor: COLORS.lightGrey3,
  },
  enabledIcon: {
    backgroundColor: COLORS.lightYellow,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTitle: {
    marginBottom: 6,
  },
});

export default styles;
