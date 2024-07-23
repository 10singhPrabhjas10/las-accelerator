import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: COLORS.grey2,
  },
  subTitle: {
    color: COLORS.darkOrange,
    marginTop: 4,
  },
  subHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  phone: {
    color: COLORS.semanticBlue,
    textDecorationLine: 'underline',
    borderBottomColor: COLORS.semanticBlue,
  },
  emailView: {
    flexDirection: 'row',
    gap: 8,
  },
  flatlist: {marginTop: 10},
  contentContainerStyle: {paddingHorizontal: 4},
});

export default styles;
