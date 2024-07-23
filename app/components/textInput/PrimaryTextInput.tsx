//External dependencies
import React from 'react';
import {Platform, StyleSheet, TextStyle, View} from 'react-native';
import {Text, TextInput, TextInputProps} from 'react-native-paper';
import {COLORS} from 'theme/colors';

//Styles, Constants and interfaces

interface IPrimaryTextInput extends TextInputProps {
  placeHolder?: string;
  titleText?: string;
  containerStyle?: TextStyle;
  textInputStyle?: TextStyle;
  onChangeText: (val: string) => void;
  value?: string;
  isRequired?: boolean;
  errorText?: string;
  disabled?: boolean;
  rest?: any;
  subtitleText?: string;
  subTitleStyle?: TextStyle;
}

const PrimaryTextInput = ({
  placeHolder = '',
  isRequired = false,
  titleText = '',
  containerStyle,
  textInputStyle,
  onChangeText,
  value,
  errorText,
  disabled,
  subtitleText,
  subTitleStyle,
  ...rest
}: IPrimaryTextInput) => {
  const theme = {
    colors: {
      background: disabled ? COLORS.lightGrey2 : COLORS.white,
      primary: COLORS.blue,
      onSurface: disabled ? COLORS.grey2 : COLORS.black,
    },
  };

  const errorTheme = {colors: {onSurface: COLORS.red}};

  return (
    <View style={containerStyle}>
      {titleText && (
        <View style={styles.titleView}>
          <Text variant="bodyMedium">{titleText}</Text>
          {isRequired && <Text style={styles.requiredText}>{' *'}</Text>}
          <Text style={subTitleStyle} variant="bodyMedium">
            {subtitleText}
          </Text>
        </View>
      )}
      <TextInput
        {...rest}
        style={[styles.textInputView, textInputStyle]}
        mode="outlined"
        error={errorText && errorText.length > 0 ? true : false}
        placeholder={placeHolder}
        disabled={disabled}
        value={value}
        theme={theme}
        onChangeText={text => onChangeText(text)}
      />
      {errorText ? (
        <Text variant="bodyMedium" theme={errorTheme}>
          {errorText}
        </Text>
      ) : null}
    </View>
  );
};

export default PrimaryTextInput;

export const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  titleView: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  textInputView: {
    lineHeight: Platform.OS === 'android' ? 30 : 0,
  },
  requiredText: {color: COLORS.red},
});
