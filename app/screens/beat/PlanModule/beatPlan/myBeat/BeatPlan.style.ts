import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  title: {color: COLORS.delightYellow},
  subtitle: {
    color: COLORS.red,
    marginTop: 6,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19,
  },
  label: {
    marginTop: 20,
  },
  buttonView: {flexDirection: 'row', gap: 20},
  textInput: {
    justifyContent: 'center',
    paddingTop: 15,
    textAlignVertical: 'center',
  },
  icon: {marginTop: 24},
  labelView: {width: 271, marginTop: 22},
  beatPlanText: {textAlign: 'center', width: 271, marginTop: 22},
  modalHeight: {height: 600},
});

export default styles;
