import {COLORS} from '@/theme/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Selector: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layout: {
    alignItems: 'center',
  },
  marginRightZero: {
    marginRight: 0,
  },
  tabBar: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#0097A91F',
    marginVertical: 10,
  },

  modal: {
    width: '100%',
    padding: '10%',
    height: '40%',
    justifyContent: 'center',
  },
  DateView: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeChip: {borderColor: COLORS.dgreen, backgroundColor: COLORS.accentGreen},
  chip: {
    marginHorizontal: 3,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: COLORS.dividerGrey,
  },
  listContainer: {alignSelf: 'flex-start', padding: 2},
  list: {
    alignSelf: 'flex-start',
    width: '90%',
    marginHorizontal: 15,
  },
});
