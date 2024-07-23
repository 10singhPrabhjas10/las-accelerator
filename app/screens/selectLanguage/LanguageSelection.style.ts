import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';
import {getDeviceHeight, getDeviceWidth} from 'utils/commonMethods';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    paddingVertical: 20,
    flex: 1,
  },
  headerTitle: {
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: 12,
  },
  languageCard: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 25,
  },
  subCardContainer: {
    flex: 1 / 3,
    height: 85,
    margin: 6,
    backgroundColor: COLORS.white,
  },
  activeSubCardContainer: {
    flex: 1 / 3,
    height: 85,
    margin: 6,
    backgroundColor: COLORS.backgroundYellow,
  },
  disabledSubCardContainer: {
    flex: 1 / 3,
    height: 85,
    margin: 6,
    backgroundColor: COLORS.lightGrey,
  },
  columnWrapper: {
    gap: 20,
  },
  cardContent: {
    alignItems: 'center',
    gap: 4,
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  imageHeader: {
    height: getDeviceHeight(0.3),
    width: getDeviceWidth(),
  },
});

export default styles;
