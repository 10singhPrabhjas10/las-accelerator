import {Platform, StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
  },

  dropdown: {
    ...Platform.select({
      android: {
        marginTop: 80,
      },
    }),
  },
  dropDownItemTextStyle: {
    fontFamily: 'soleto_regular',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 20,
  },
  dropDownItemStyle: {
    backgroundColor: COLORS.white,
  },
  dropDownItemSelectedTextStyle: {
    color: COLORS.dDarkGreen,
  },
  dropDownItemSelectedStyle: {
    backgroundColor: COLORS.backgroundDgreen,
  },
  titleView: {
    flexDirection: 'row',
  },
  requiredText: {color: COLORS.red},
  menuContentStyle: {backgroundColor: COLORS.white},
  multiSelectView: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 4,
    borderColor: COLORS.grey2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  multiSelectPlaceholder: {color: COLORS.grey2},
  multiBorderView: {
    borderColor: COLORS.grey2,
    borderRadius: 5,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  placeholderBorderBox: {
    borderWidth: 1,
    borderColor: COLORS.grey2,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    justifyContent: 'space-between',
    marginRight: 15,
  },
  iconView: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 16,
  },
  reverseCheckBoxStyle: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
});

export default styles;
