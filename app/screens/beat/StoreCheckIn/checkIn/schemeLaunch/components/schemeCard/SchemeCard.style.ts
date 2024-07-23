import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingBottom: 14,
    marginHorizontal: 4,
  },
  cardContent: {
    gap: 10,
  },
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  contentFooter: {
    marginTop: 16,
    flex: 1,
    paddingRight: 8,
    gap: 10,
  },
  buttonContentStyle: {flexDirection: 'row-reverse'},
  contentText: {
    color: COLORS.grey2,
  },
});
export default styles;
