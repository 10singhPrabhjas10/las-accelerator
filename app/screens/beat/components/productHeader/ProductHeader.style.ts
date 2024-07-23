import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  cardBackground: {
    borderRadius: 4,
    borderWidth: 0,
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    shadowColor: COLORS.white,
  },
  profileView: {
    width: 30,
    height: 34,
    borderRadius: 0,
    backgroundColor: COLORS.white,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    borderRadius: 0,
    height: 50,
    width: 0,
    paddingHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  cardRightContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  menuContent: {
    backgroundColor: COLORS.white,
    height: 120,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'soleto_regular',
    letterSpacing: 0.25,
  },
});
export default styles;
