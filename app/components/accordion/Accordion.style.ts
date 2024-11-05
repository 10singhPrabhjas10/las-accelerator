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
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  titleStyle: {
    color: COLORS.darkYellow,
  },
  iconStyle: {
    alignSelf: 'center',
    marginLeft: 10,
    top: 2,
  },
});

export default styles;
