import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
    backgroundColor: COLORS.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  contentView: {
    alignItems: 'center',
  },
  titleStyle: {
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  saveCancelBtn: {
    width: 148,
    height: 40,
    borderRadius: 4,
  },
  divider1: {
    backgroundColor: COLORS.lightGrey2,
    height: 1,
    width: '100%',
    margin: 20,
  },
  divider2: {
    height: 1,
    width: '100%',
    marginBottom: 20,
    backgroundColor: COLORS.lightGrey2,
  },
});

export default styles;
