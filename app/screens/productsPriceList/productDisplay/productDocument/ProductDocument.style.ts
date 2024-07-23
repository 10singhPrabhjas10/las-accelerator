import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  textStyle: {color: COLORS.grey2, marginTop: 20},
  emptyContainer: {
    flexGrow: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
  },
  labelStyle: {
    color: COLORS.grey2,
    gap: 16,
    paddingTop: 16,
    paddingLeft: 16,
  },
  contentContainer: {
    gap: 16,
    padding: 16,
    flexGrow: 1,
  },
  filterButton: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    left: 0,
    right: 0,
  },
});

export default styles;
