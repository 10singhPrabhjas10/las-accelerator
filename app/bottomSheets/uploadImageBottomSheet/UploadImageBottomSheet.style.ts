import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSheetCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
    paddingTop: 20,
  },
  cardBackground: {
    flex: 1,
    height: 100,
    backgroundColor: COLORS.white,
  },
  cardContent: {alignItems: 'center'},
  cardItemText: {marginTop: 15},
});

export default styles;
