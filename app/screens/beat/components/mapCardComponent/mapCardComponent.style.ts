import { COLORS } from '@/theme/colors';
import { heightToRatio, widthToRatio } from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';
import { green } from 'react-native-reanimated/lib/typescript/Colors';

const styles = StyleSheet.create({
  container: {
    width: widthToRatio(285),
    padding: 10,
    paddingTop: 5,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#ffffff',
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
    padding: 2,
    display: 'flex',
    flexDirection: 'row'
  },
  numberContainer: {
    width: widthToRatio(30),
    justifyContent: 'center',
    position: 'absolute',
    top: 14.5,
  },
  numberText: {
    borderColor: '#797C7C',
    borderWidth: 2,
    textAlign: 'center',
    alignItems: 'center',
    width: widthToRatio(26),
    padding: 3,
    borderRadius: 50,
    color: COLORS.white,
    backgroundColor: '#797C7C',
  },
  infoTextContainer: {
    width: widthToRatio(215),
    padding: 10,
    marginRight: 4.5,
    marginLeft: 23,
  },
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  addressText: {
    fontSize: 12,
    color: '#796767',
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
    padding: 5,
    fontSize: 12,
    color: '#656767',
  },
  navigationlinkText: {
    paddingBottom: 2,
    marginHorizontal: 4,
    fontSize: 13,
    color: COLORS.darkBlue,
  },
  checkInButton: {
    borderWidth: 1,
    borderColor: COLORS.dgreen,
    borderRadius: 9,
    height: heightToRatio(32),
    width: widthToRatio(98),
  },
  checkInButtonText: {
    color: COLORS.dgreen,
    fontSize: 12, 
    lineHeight:14.25, 
  },
});

export default styles;