import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS} from '../../theme/colors';
import {IActionButtonProps} from '../../types/buttons';
import {Card, Text} from 'react-native-paper';

const ActionButton = ({
  icon,
  title,
  onPress,
  isSelected,
}: IActionButtonProps) => {
  return (
    <Pressable onPress={() => onPress(title)}>
      <Card style={[styles.cardContainer, isSelected && styles.selectedCard]}>
        <Card.Content style={styles.container}>
          {icon}
          <View style={styles.textContainer}>
            <Text variant="titleMedium" style={styles.title}>
              {title}
            </Text>
          </View>
          {/* <View style={styles.arrow}>
            <ArrowRightIcon />
          </View> */}
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    paddingVertical: 4,
  },
  container: {
    flexDirection: 'row',
    padding: 6,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 14,
  },
  title: {
    fontWeight: '400',
    color: COLORS.black,
  },
  subTitle: {
    color: COLORS.grey,
    fontSize: 12,
  },
  arrow: {
    backgroundColor: COLORS.backgroundDgreen,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
  },
  selectedCard: {
    backgroundColor: '#e3fbe6',
    borderColor: '#2ecc40',
    borderWidth: 1,
  },
});
