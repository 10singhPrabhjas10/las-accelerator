import {heightToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  headText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '86%',
    marginVertical: '5%',
  },
  flatListContainer: {
    paddingBottom: heightToRatio(100),
  },
});
