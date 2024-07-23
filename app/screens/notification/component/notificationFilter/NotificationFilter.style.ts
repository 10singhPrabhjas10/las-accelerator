import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomCard: {
    marginVertical: 20,
    backgroundColor: COLORS.lightblue,
    borderRadius: 4,
    shadowOpacity: 0,
    textShadowRadius: 0,
    shadowRadius: 0,
  },
  notificationRangeText: {
    marginLeft: 10,
  },
});

export default styles;
