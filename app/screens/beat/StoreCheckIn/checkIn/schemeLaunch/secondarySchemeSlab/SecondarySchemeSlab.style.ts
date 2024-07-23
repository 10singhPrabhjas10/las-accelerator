import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bodyContainerWithData: {
    flexGrow: 1,
    gap: 18,
  },
  bodyContainerWithoutData: {
    flexGrow: 1,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    gap: 5,
  },
  button: {
    marginVertical: 16,
  },
  text: {
    textDecorationLine: 'underline',
  },
  subHeading: {
    color: COLORS.grey4,
  },
  buttonTextStyle: {
    textDecorationLine: 'underline',
  },
});

export default styles;
