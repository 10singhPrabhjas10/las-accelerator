import {COLORS} from 'theme/colors';
import {StyleSheet} from 'react-native';
import {getDeviceHeight, getDeviceWidth} from 'utils/commonMethods';

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  textInputContainer: {
    marginTop: 15,
  },
  group: {
    marginBottom: 15,
  },
  LoginCard: {
    zIndex: 1,
  },
  EnterMobile: {
    marginBottom: 10,
  },
  textInputText: {
    height: 50,
    textAlignVertical: 'center',
  },
  checkBoxView: {
    width: getDeviceWidth(0.8),
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  termsText: {
    paddingTop: 7,
  },
  button: {
    marginHorizontal: 20,
  },
  ButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  BackButton: {
    borderColor: COLORS.dgreen,
    flex: 1,
    marginHorizontal: 20,
    padding: 5,
  },
  OTPButton: {
    flex: 1,
    marginHorizontal: 20,
    padding: 5,
  },
  BackTextStyle: {
    color: COLORS.dgreen,
  },
  OTPtextStyle: {
    color: COLORS.white,
  },
  imageHeader: {
    height: getDeviceHeight(0.3),
    width: getDeviceWidth(),
    backgroundColor: COLORS.dDarkGreen,
  },
});

export default styles;
