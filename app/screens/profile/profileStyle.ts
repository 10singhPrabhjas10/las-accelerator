import {StyleSheet} from 'react-native';
import {COLORS} from '../../theme/colors';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {fontConfig} from '@/theme/fonts';

const styles = StyleSheet.create({
  profileBodyView: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 16,
  },
  notificationToggle: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  iconStyle: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  viewLine: {
    marginVertical: 16,
    height: 1,
    width: '100%',
    backgroundColor: COLORS.dividerGrey,
  },
  contentStyle: {flexDirection: 'row-reverse'},
  buttonStyle: {
    marginHorizontal: 4,
    marginTop: 15,
    borderColor: COLORS.dDarkGreen,
  },
  titleText: {
    fontWeight: '500',
    fontSize: heightToRatio(16),
    lineHeight: heightToRatio(20),
    color: COLORS.neutralLight,
  },
  viewPartner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dgreen,
    padding: 5,
    borderRadius: 5,
    marginTop: heightToRatio(10),
  },
  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  imageContainer: {
    height: heightToRatio(280),
    width: 'auto',
    backgroundColor: COLORS.neutralLight,
    borderRadius: heightToRatio(8),
    marginTop: heightToRatio(8),
  },
  deleteIconContainer: {
    width: heightToRatio(40),
    height: heightToRatio(40),
    backgroundColor: COLORS.white,
    borderRadius: heightToRatio(20),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: heightToRatio(10),
    right: heightToRatio(10),
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: heightToRatio(12),
  },
  ButtonStyleBS: {
    width: widthToRatio(150),
    height: heightToRatio(48),
    justifyContent: 'center',
  },
  updateButton: {
    height: heightToRatio(48),
    justifyContent: 'center',
    marginVertical: heightToRatio(18),
  },
  buttonText: {
    color: COLORS.dDarkGreen,
  },
  greenLabel: {
    color: COLORS.white,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '500',
  },
  description: {
    fontWeight: '500',
    fontSize: heightToRatio(14),
    lineHeight: heightToRatio(17.5),
  },
  image: {
    height: heightToRatio(314),
    borderRadius: heightToRatio(8),
    width: 'auto',
  },
  modalTopContainer: {
    height: heightToRatio(237),
    width: widthToRatio(312),
    paddingHorizontal: widthToRatio(12),
    paddingVertical: heightToRatio(12),
  },
  modalSubHeading: {
    fontWeight: '500',
    fontSize: heightToRatio(14),
    lineHeight: heightToRatio(17.5),
    color: COLORS.grey500,
  },
  modalHeading: {
    fontWeight: '700',
    fontSize: heightToRatio(20),
    lineHeight: heightToRatio(25),
    color: COLORS.grey500,
  },
  divider: {
    width: '100%',
    height: heightToRatio(1),
    backgroundColor: COLORS.dividerGrey,
    marginVertical: heightToRatio(12),
  },
  contactContainer: {
    marginTop: heightToRatio(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContact: {
    color: COLORS.green,
    fontWeight: '400',
    fontSize: heightToRatio(14),
    lineHeight: heightToRatio(21),
    marginLeft: widthToRatio(6),
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
  },
  languageContainer: {
    marginHorizontal: '10%',
    paddingBottom: '20%',
  },
  languageHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '5%',
  },
  languageDropDown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 24,
    marginLeft: -24,
  },
  top: {
    top: 2,
  },
  accordionchildrenStyles: {
    paddingVertical: 0,
  },
  kyctextStyle: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  kycButton: {
    marginLeft: 'auto',
    marginRight: 16,
    marginVertical: 16,
    height: heightToRatio(32),
  },
  kycBtntextStyle: {
    height: 46,
    ...fontConfig.labelMedium,
    color: COLORS.white,
  },
  switchStyles: {
    bottom: 2,
    marginLeft: 'auto',
  },
  switchText: {
    marginLeft: 8,
    bottom: 2,
  },
});
export default styles;
