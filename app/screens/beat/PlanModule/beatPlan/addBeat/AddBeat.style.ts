import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  containerView: {marginHorizontal: 20, marginTop: 24, flex: 1},
  dateComponent: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    shadowColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    paddingVertical: 24,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dateText: {marginLeft: 24},
  pencilIcon: {marginRight: 16},
  calendarView: {height: 400, borderWidth: 1, borderColor: COLORS.borderGray},
  modifyView: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: 6,
  },
  modifyText: {color: COLORS.darkBlue},
  flatlistStyle: {marginBottom: 10},
  button: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {marginTop: 24},
});
export default styles;
