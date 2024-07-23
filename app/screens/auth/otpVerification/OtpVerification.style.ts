import {StyleSheet} from 'react-native';
import {getDeviceHeight, getDeviceWidth} from 'utils/commonMethods';

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    padding: 20,
  },
  textInputContainer: {
    marginTop: 15,
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
  },
  modalText: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default styles;
