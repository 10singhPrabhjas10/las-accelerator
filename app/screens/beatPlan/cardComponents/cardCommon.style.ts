import {COLORS} from '@/theme/colors';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {},
  infoContainer: {
    padding: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTextContainer: {
    padding: 10,
    marginHorizontal: 5,
  },
  nameText: {
    color: COLORS.black,
  },
  addressText: {
    color: COLORS.grey,
  },
  phoneimageContainer: {
    marginTop: 14,
    height: heightToRatio(26),
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  statusText: {
    marginHorizontal: 2,
  },
  // checkInButton: {
  //   borderWidth: 2,
  //   borderColor: COLORS.dgreen,
  //   borderRadius: 8,
  //   height: heightToRatio(32),
  //   width: widthToRatio(91.4),
  // },
  // checkInButtonText: {
  //   color: COLORS.dgreen,
  //   fontSize: 12,
  //   lineHeight: 14.25,
  // },
});

export default styles;
