import {StyleSheet} from 'react-native';

export const CARD_PADDING = 16;
export const CARD_BORDER_RADIUS = 8;
export const CARD_MARGIN_VERTICAL = 12;

export const commonStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: CARD_BORDER_RADIUS,
    padding: CARD_PADDING,
    marginVertical: CARD_MARGIN_VERTICAL,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    width: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#282C3B',
    marginBottom: 12,
  },
}); 