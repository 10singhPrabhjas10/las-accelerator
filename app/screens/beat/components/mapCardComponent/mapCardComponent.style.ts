import { COLORS } from '@/theme/colors';
import { heightToRatio, widthToRatio } from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';
import { green } from 'react-native-reanimated/lib/typescript/Colors';

const styles = StyleSheet.create({
  container: {
    width: widthToRatio(285),
    height: heightToRatio(128),
    padding: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.75,
    shadowRadius: 2,
  },
  infoContainer: {
    padding: 1,
    display: 'flex',
    flexDirection: 'row',
    marginTop: -3,
  },
  numberContainer: {
    width: widthToRatio(30),
    justifyContent: 'center',
    position: 'absolute',
    top: 14.5,
  },
  numberText: {
    borderColor: COLORS.grey2,
    borderWidth: 2,
    textAlign: 'center',
    alignItems: 'center',
    width: widthToRatio(26),
    padding: 3,
    borderRadius: 50,
    color: COLORS.white,
    backgroundColor: COLORS.grey2,
  },
  infoTextContainer: {
    width: widthToRatio(200),
    padding: 10,
    marginRight: 4.5,
    marginLeft: 23,
  },
  nameText: {
    fontWeight: 'bold',
    color: COLORS.black,
  },
  addressText: {
    fontSize: 12,
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
    height: heightToRatio(35),
  },
  navInfoContainer: {
    margin: 2,
    padding: 4,
  },
  navImg: {
    marginHorizontal: 5,
    position: 'absolute',
    marginVertical: 6,
  },
  distanceTimeText: {
    marginLeft: 18,
    padding: 1,
    color: COLORS.grey,
  },
  navigationlinkText: {
    padding: 2,
    marginHorizontal: 4,
    color: COLORS.darkBlue,
  },
  checkInButton: {
    borderWidth: 2,
    borderColor: COLORS.dgreen,
    borderRadius: 8,
    height: heightToRatio(32),
    width: widthToRatio(91.4),
  },
  checkInButtonText: {
    color: COLORS.dgreen,
    fontSize: 12, 
    lineHeight:14.25, 
  },
});

export default styles;