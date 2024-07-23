import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  series: {
    color: COLORS.grey2,
  },
  bodyContainerWithData: {
    flexGrow: 1,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
    paddingVertical: 20,
  },
  contentHeading: {
    color: COLORS.grey2,
  },
  cardHeader: {
    color: COLORS.darkOrange,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    paddingTop: 10,
    marginTop: 16,
    paddingBottom: 60,
    maxHeight: Dimensions.get('window').height - 160,
  },
  cardDivider: {
    marginVertical: 15,
  },
});

export default styles;
