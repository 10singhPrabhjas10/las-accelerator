import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    flex: 1 / 2,
    resizeMode: 'contain',
    aspectRatio: 1,
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
    backgroundColor: COLORS.yellow,
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
    backgroundColor: COLORS.darkYellow,
  },
  inActiveDot: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  emptyView: {width: 20},
});

export default styles;
