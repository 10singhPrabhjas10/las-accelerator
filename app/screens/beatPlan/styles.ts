import {COLORS} from '@/theme/colors';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  navigationParent: {
    width: '90%',
    alignSelf: 'center',
  },
  insightParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navigationCard: {
    width: '45%',
    aspectRatio: 3 / 2,
    justifyContent: 'space-evenly',
  },
  quickLinkParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
  },
  DateView: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },

  ////
  modal: {
    width: '100%',
    padding: '10%',
    height: '40%',
    justifyContent: 'center',
  },
});
