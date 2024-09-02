import {COLORS} from 'theme/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardBackground: {
    backgroundColor: COLORS.dDarkGreen,
    borderRadius: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  editIcon: {
    bottom: 0,
    right: -10,
    position: 'absolute',
  },
  titleSecondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    paddingLeft: 20,
    marginRight: 6,
  },
  profileView: {
    height: 70,
    width: 70,
    backgroundColor: COLORS.lightGrey2,
    borderRadius: 80,
  },
  profileIcon: {
    position: 'absolute',
  },
  container: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  userIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.lightGrey,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
  },
  subTitle: {
    fontSize: 14,
  },
  containerHeader: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 4,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor: COLORS.dDarkGreen,
    justifyContent: 'space-between',
  },
  header: {
    textDecorationLine: 'underline',
    paddingHorizontal: 10,
    fontWeight: '400',
    color: COLORS.white,
  },
  languageContainer: {},
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 10,
  },
  textStyle: {
    color: COLORS.white,
  },
});

export default styles;
