import { COLORS } from '@/theme/colors';
import { heightToRatio, widthToRatio } from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  numberContainer: {
    width: widthToRatio(30),
    height: heightToRatio(30),
    top: 17,
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
});

export default styles;