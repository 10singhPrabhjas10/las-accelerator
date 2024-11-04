import { COLORS } from '@/theme/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  image: {
    width: 32,
    height: 32,
  },
  navImg: {
    marginHorizontal: 5,
    position: 'absolute',
    marginVertical: 5,
  },
  distanceTimeText: {
    marginLeft: 18,
    padding: 5,
    color: COLORS.grey,
  },
});

export default styles;