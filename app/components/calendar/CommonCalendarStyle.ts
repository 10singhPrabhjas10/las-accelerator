import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';
const {width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.surfaceColor,
  },
  calendarContainer: {
    borderRadius: 8,
    padding: 0,
    elevation: 2,
  },
  calendarHeaderWrap: {
    padding: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'flex-start',
  },
  calenderTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
    marginTop: 8,
    marginLeft: 16,
  },
  calendarHeaderDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
    marginBottom: 8,
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  calenderTitleWrap: {
    borderBottomWidth: 1,
    borderColor: COLORS.borderGray,
  },
  monthDisplay: {
    fontSize: 18,
    color: '#222',
    fontWeight: '500',
  },
  headerArrows: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBtn: {
    padding: 8,
    marginLeft: 8,
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
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
  },
  numberTypeInfo: {
    textAlign: 'center',
    fontFamily: 'soleto_regular',
    fontSize: 14,
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
  calendar: {
    borderRadius: 16,
    elevation: 2,
    backgroundColor: COLORS.cardBg,
    shadowColor: COLORS.cardShadow,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    marginTop: 8,
  },
  calendarOverlay: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
    marginVertical: 16,
    padding: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  summaryCard: {
    width: width / 5.5,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 2,
    elevation: 1,
    shadowColor: COLORS.cardShadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 1},
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },

  headerWrap: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingRight: 8,
    justifyContent: 'space-between',
  },
  monthLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 16,
    paddingStart: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  downArrow: {
    marginLeft: 8,
  },
  arrowsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 8,
    marginBottom: 8,
    width: '100%',
    alignSelf: 'stretch',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 32,
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  monthItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  monthItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
