import React, {useState} from 'react';
import {Text, StyleSheet, View, ViewStyle, TextStyle} from 'react-native';
import {COLORS} from '../../theme/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ActionTouchableButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ActionTouchableButton: React.FC<ActionTouchableButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        pressed && {backgroundColor: COLORS.backgroundDgreen},
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 3,
    padding: 16,
    gap: 8,
    marginVertical:12
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
});

export default ActionTouchableButton;
