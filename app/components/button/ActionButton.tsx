import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS} from '../../theme/colors';
import {IActionButtonProps} from '../../types/buttons';
import {Card, Text} from 'react-native-paper';
import ArrowRightIcon from '../../../assets/icons/arrowRight.svg';

const ActionButton = ({
  icon,
  title,
  onPress,
  rightIcon,
  pressableProps = {},
}: IActionButtonProps) => {
  return (
    <Pressable onPress={() => onPress(title)} {...pressableProps}>
      <Card style={styles.cardContainer}>
        <Card.Content style={styles.container}>
          {icon}
          <View style={styles.textContainer}>
            <Text variant="titleMedium" style={styles.title}>
              {title}
            </Text>
          </View>
          {rightIcon && (
            <View style={styles.arrow}>
              <ArrowRightIcon />
            </View>
          )}
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
    padding: 8,
  },
  container: {
    flexDirection: 'row',
    padding: 10,
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
});
