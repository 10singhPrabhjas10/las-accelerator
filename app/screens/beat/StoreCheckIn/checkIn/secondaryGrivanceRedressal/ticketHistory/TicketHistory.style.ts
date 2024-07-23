import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  contentContainerStyle: {padding: 20, gap: 20, flexGrow: 1},
  badgeStyle: {right: 10, bottom: 0, position: 'absolute'},
  textStyle: {color: COLORS.grey2, marginTop: 20},
  ticketStyle: {paddingLeft: 16, paddingTop: 16},
  button: {
    marginBottom: 24,
    marginHorizontal: 20,
  },
});

export default styles;
