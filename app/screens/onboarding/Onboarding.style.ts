import {getDeviceHeight, getDeviceWidth, heightToRatio} from '@/utils/commonMethods';
import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  onboardingContainer: {
    backgroundColor: COLORS.dDarkGreen,
    // flex: 1,
    height: getDeviceHeight(0.6),
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: getDeviceWidth(1),
  },
  contentView: {
    backgroundColor: '#EEF7F9',
    height: heightToRatio(110),
    marginHorizontal: 15,
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  image: {
    flex: 1 / 2,
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  buttonText: {
    color: COLORS.white,
  },

  textDescription: {
    textAlign: 'center',
    marginTop: 50,
    marginHorizontal: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.dDarkGreen,
    padding: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  activeDot: {
    height: 12,
    width: 12,
    borderRadius: 10,
    backgroundColor: COLORS.green,
  },
  inActiveDot: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  emptyView: {width: 20},
  buttonTextStyle: {
    color: COLORS.white,
  },
});

export default styles;
