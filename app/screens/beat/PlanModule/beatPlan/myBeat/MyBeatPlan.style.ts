import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 24,
    flex: 1,
  },
  saveButton: {marginBottom: 16, marginHorizontal: 20},
  headlineStyle: {color: COLORS.darkGreen2},
  dateHeader: {
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
  calendar: {height: 400, borderWidth: 1, borderColor: COLORS.borderGray},
  flatlist: {marginBottom: 10},
  infoCardView: {marginTop: 24},
});

export default styles;
