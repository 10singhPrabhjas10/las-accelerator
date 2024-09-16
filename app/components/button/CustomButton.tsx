import React from 'react';
import {Button, Text} from 'react-native-paper';
import {heightToRatio} from '@/utils/commonMethods';
import {COLORS} from 'theme/colors';
import {ButtonTypes, ICustomButtonProps} from 'types/buttons';

const CustomButton = ({
  key,
  type,
  text,
  icon,
  onPress,
  style,
  isDisabled = false,
  textCustomTheme,
  loading = false,
  textStyle = {color: 'white'},
  contentStyle,
}: ICustomButtonProps) => {
  const containedButtonTheme = {
    roundness: 1,
    colors: {
      onSurface: COLORS.black,
    },
  };

  const outlineButtonTheme = {
    colors: {outline: isDisabled ? COLORS.grey3 : COLORS.orange},
    roundness: 1,
  };

  const textTheme = textCustomTheme ?? {
    colors: {onSurface: isDisabled ? COLORS.grey3 : COLORS.black},
  };

  return (
    <Button
      key={key}
      theme={
        type === ButtonTypes.contained
          ? containedButtonTheme
          : outlineButtonTheme
      }
      style={[{height: heightToRatio(46)}, style]}
      mode={type}
      loading={loading}
      icon={() => icon}
      disabled={isDisabled}
      contentStyle={contentStyle}
      onPress={onPress}>
      <Text style={textStyle} variant="bodyMedium" theme={textTheme}>
        {text}
      </Text>
    </Button>
  );
};

export default CustomButton;
