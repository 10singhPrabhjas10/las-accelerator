import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  heading: {
    height: 50,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 6,
    shadowRadius: 2,
    elevation: 2,
  },
  innerContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
  },
  titleStyle: {
    color: COLORS.darkYellow,
  },
});

export default styles;
