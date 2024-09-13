import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';
import {getDeviceHeight, getDeviceWidth} from 'utils/commonMethods';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    // paddingVertical: 20,
    height: getDeviceHeight(0.6),
  },
  headerTitle: {
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  flatlist: {
    flex: 1,
    // maxHeight: getDeviceHeight(0.3),
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
    height: 48,
    margin: 6,
    borderRadius: 2,
    marginVertical: 10,
    backgroundColor: COLORS.white,
  },
  activeSubCardContainer: {
    // flex: 1,
    // width: getDeviceWidth(0.9),
    // width: 500,
    marginVertical: 10,
    height: 48,
    margin: 6,
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: COLORS.backgroundDgreen,
  },
  disabledSubCardContainer: {
    // flex: 1,
    height: 85,
    margin: 6,

    backgroundColor: COLORS.lightGrey,
  },
  columnWrapper: {
    // gap: 20,
  },
  cardContent: {
    alignItems: 'center',

    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  buttonText: {
    color: COLORS.white,
  },
  imageHeader: {
    height: getDeviceHeight(0.3),
    width: getDeviceWidth(),
    backgroundColor: COLORS.dDarkGreen,
  },
});

export default styles;
