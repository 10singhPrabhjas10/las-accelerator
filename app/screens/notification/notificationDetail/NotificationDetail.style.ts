import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 40,
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: COLORS.lightGrey2,
  },
  cardContent: {
    gap: 20,
  },
  cardHeadingSection: {gap: 5},
  containerFooter: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});

export default styles;
