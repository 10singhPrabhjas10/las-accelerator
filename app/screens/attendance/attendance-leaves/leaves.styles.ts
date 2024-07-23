import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

export const leaveStyles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.white,
  },
  diplayInfoBlock: {
    flex: 1,
  },
  formContainer: {
    marginVertical: 24,
  },
  formFieldsContainer: {
    marginBottom: 24,
  },
  radioGroup: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'flex-start',
  },
});
