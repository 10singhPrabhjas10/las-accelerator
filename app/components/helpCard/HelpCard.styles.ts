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
  dropDownContent: {
    flex: 1,
    left: '20%',
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
