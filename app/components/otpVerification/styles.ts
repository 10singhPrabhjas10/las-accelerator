import {COLORS} from 'theme/colors';
import {StyleSheet} from 'react-native';
import {widthToRatio, heightToRatio} from 'utils/commonMethods';

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  card: {
    width: widthToRatio(312),
    alignSelf: 'center',
    paddingHorizontal: widthToRatio(16),
    paddingVertical: heightToRatio(16),
    backgroundColor: COLORS.white,
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
    padding: '5%',
  },
  modalcontainerBottom: {
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  ResendOTP: {
    color: COLORS.dgreen,
  },
  ResendOTPDisabled: {
    color: COLORS.grey,
  },
  marginTop: {
    marginTop: 30,
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
