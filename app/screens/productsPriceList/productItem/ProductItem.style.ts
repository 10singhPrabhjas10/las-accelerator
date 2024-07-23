import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  profileStyle: {
    width: 30,
    height: 34,
    borderRadius: 0,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    marginTop: 8,
  },
  customProfileView: {
    borderRadius: 0,
    height: 50,
    width: 0,
    paddingHorizontal: 20,
  },
  customCardStyle: {
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: COLORS.lightGrey3,
    borderColor: COLORS.lightGrey2,
  },
  labelStyle: {
    color: COLORS.grey2,
    gap: 16,
    paddingTop: 16,
    paddingLeft: 4,
    paddingBottom: 16,
  },
  containerStyle: {marginHorizontal: 16},
  viewStyle: {flex: 1, paddingBottom: 16},
});

export default styles;
