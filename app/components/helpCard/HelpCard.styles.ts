import {COLORS} from '@/theme/colors';
import {StyleSheet} from 'react-native';
const width = '10%';
const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
  },
  Icon: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width,
  },
  content: {
    flex: 1,
  },
  accordionLabel: {
    fontFamily: 'soleto_medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: 20,
  },
  dropDownContent: {
    flex: 1,
    zIndex: 1,
    left: '10%',
    marginTop: '5%',
  },
  greenText: {
    color: COLORS.dgreen,
  },
  margin: {
    marginBottom: '10%',
  },
});
export default styles;
