import {COLORS} from 'theme/colors';
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
  imageHeader: {
    height: getDeviceHeight(0.3),
    width: getDeviceWidth(),
    backgroundColor: COLORS.dDarkGreen,
  },
});

export default styles;
