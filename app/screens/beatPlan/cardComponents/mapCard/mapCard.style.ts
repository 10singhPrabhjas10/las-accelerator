import {COLORS} from '@/theme/colors';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  numberContainer: {
    width: widthToRatio(30),
    height: heightToRatio(30),
    top: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  numberText: {color: COLORS.white},
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
