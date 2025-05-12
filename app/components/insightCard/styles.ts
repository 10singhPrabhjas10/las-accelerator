import {COLORS} from '@/theme/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.insightBackground,
    borderRadius: 8,
    padding: 16,
    aspectRatio: 1,
    minWidth: '30%',
    marginBottom: 16,
  },
  value: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  title: {
    color: 'white',
    fontSize: 14,
  },
  calenderBackground: {
    padding: 5,
    backgroundColor: COLORS.pantone,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
});
