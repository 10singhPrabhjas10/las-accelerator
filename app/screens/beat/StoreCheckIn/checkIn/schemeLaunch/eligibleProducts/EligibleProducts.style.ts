import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  bodyContainerWithData: {
    flexGrow: 1,
    paddingTop: 20,
    gap: 18,
  },
  cardContainer: {
    flex: 1,
    gap: 12,
    marginBottom: 20,
  },
  contentHeading: {
    color: COLORS.grey4,
  },
  accordionCard: {
    paddingTop: 10,
    gap: 16,
  },
  accordionTitle: {
    color: COLORS.darkYellow,
  },
});

export default styles;
