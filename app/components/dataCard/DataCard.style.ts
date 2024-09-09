import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginHorizontal: 4,
  },
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 10,
  },
  buttonContentStyle: {flexDirection: 'row-reverse'},
  header: {
    color: COLORS.grey2,
    paddingBottom: 15,
  },
  buttonStyle: {
    borderColor: COLORS.dDarkGreen,
  },
});
export default styles;
