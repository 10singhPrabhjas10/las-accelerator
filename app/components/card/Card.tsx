import React, {ReactNode} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Card} from 'react-native-paper';
import {COLORS} from 'theme/colors';

interface ICardProps {
  children: ReactNode;
  cardStyle?: ViewStyle;
}

const CardWrapper = ({children, cardStyle}: ICardProps) => {
  return (
    <Card style={[styles.container, cardStyle]}>
      <Card.Content style={styles.cardContent}>{children}</Card.Content>
    </Card>
  );
};

export default CardWrapper;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderColor: 'lightgrey',
    margin: 3,
    borderRadius: 8,
    elevation: 2, // For Android
    shadowColor: COLORS.black, // For iOS
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    backgroundColor: COLORS.white,
  },
  cardContent: {
    flexDirection: 'column',
  },
});
