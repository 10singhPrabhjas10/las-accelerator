import {COLORS} from 'theme/colors';
import {StyleSheet} from 'react-native';
import {getDeviceHeight, getDeviceWidth} from 'utils/commonMethods';

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  IconContainer: {
    marginBottom: 10,
  },
  OTPbanner: {
    backgroundColor: COLORS.transparentGreen,
    borderRadius: 10,
    flex: 1,
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  OTPBannerText: {
    color: COLORS.dgreen,
    paddingHorizontal: 1,
    paddingVertical: 5,
  },
  group: {
    marginBottom: 15,
  },
  textInputContainer: {
    marginTop: 15,
    borderColor: COLORS.dgreen,
  },
  greenText: {
    color: COLORS.dgreen,
    left: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.dgreen,
  },
  contactGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalTopContainer: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  modalcontainerBottom: {
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  checkBoxView: {
    width: getDeviceWidth(0.8),
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  otpTitle: {
    paddingTop: 7,
    paddingBottom: 10,
  },
  resendOtp: {
    paddingTop: 20,
  },
  button: {
    marginHorizontal: 20,
  },
  imageHeader: {
    height: getDeviceHeight(0.3),
    width: getDeviceWidth(),
    backgroundColor: COLORS.dDarkGreen,
  },
  marginTop: {
    marginTop: 30,
  },
  modalText: {
    marginTop: 20,
    textAlign: 'center',
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
  ResendOTP: {
    color: COLORS.dgreen,
  },
  ResendOTPDisabled: {
    color: COLORS.grey,
  },
  OTPtextStyle: {
    color: COLORS.white,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  helpTextContainer: {
    borderWidth: 1,
    backgroundColor: COLORS.dividerGrey,
    width: '100%',
    borderColor: COLORS.dividerGrey,
    marginVertical: 10,
  },
});

export default styles;
