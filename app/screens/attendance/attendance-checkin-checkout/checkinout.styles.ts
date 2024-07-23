import {StyleSheet} from 'react-native';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {COLORS} from 'theme/colors';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.white,
  },
  calendarContainer: {
    borderRadius: 8,
    padding: 0,
    elevation: 2,
  },
  calendarHeaderWrap: {
    display: 'flex',
    flexDirection: 'column',
  },
  calenderTitle: {
    fontFamily: 'soleto_regular',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 32,
    color: COLORS.black,
    paddingVertical: 8,
  },
  calenderTitleWrap: {
    borderBottomWidth: 1,
    borderColor: COLORS.borderGray,
  },
  monthDisplay: {
    fontFamily: 'soleto_regular',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 20,
    color: COLORS.black,
    paddingVertical: 8,
  },
  calendarSubTitleWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  customArrowsWrap: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'flex-end',
    gap: 40,
    marginRight: 24,
  },
  daysInfoWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 8,
    shadowColor: COLORS.black, // For iOS
    marginTop: 16,
    elevation: 2, // For Android
    backgroundColor: 'white',
  },
  infoWrap: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  rightBorder: {
    borderRightWidth: 1,
    borderColor: COLORS.lightGrey2,
  },
  numberInfo: {
    textAlign: 'center',
    fontFamily: 'soleto_regular',
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
  },
  numberTypeInfo: {
    textAlign: 'center',
    fontFamily: 'soleto_regular',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 16,
    color: COLORS.black,
  },
  present: {
    color: COLORS.kellyGreen,
  },
  pending: {
    color: COLORS.lightOrange2,
  },
  absent: {
    color: COLORS.red,
  },
  weekoff: {
    color: COLORS.grey2,
  },
  holiday: {
    color: COLORS.blue,
  },
  formWrap: {
    marginVertical: 24,
  },
  formTitle: {
    textAlign: 'left',
    fontFamily: 'soleto_regular',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: 24,
    color: COLORS.black,
    marginVertical: 8,
  },
  checkInOutBtnWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
    marginVertical: 16,
  },
  checkBtn: {
    flex: 1,
  },
  inputBox: {
    lineHeight: 8,
    padding: 0,
  },
});
