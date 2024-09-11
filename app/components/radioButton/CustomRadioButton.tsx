import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import React from 'react';
import {RadioButton, Text} from 'react-native-paper';

import {COLORS} from 'theme/colors';
import CommonStyles from 'utils/commonStyle';
import {widthToRatio} from '../../utils/commonMethods';

interface IRadioButtonProps {
  value: string;
  label: string;
}

interface ICustomRadioButtonProps {
  title: string;
  isRequired?: boolean;
  onChange: (value: string) => void;
  value: string;
  data: IRadioButtonProps[];
  disabled?: boolean;
  containerStyle?: ViewStyle;
  vrButtonStyle?: ViewStyle;
  RadioButtonStyle?: ViewStyle;
  vrButtonContainerStyle?: ViewStyle;
  radioButtonContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
  labelStyle?: TextStyle;
  isVerticalButtons?: boolean;
}

const CustomRadioButton = ({
  title,
  isRequired = false,
  onChange,
  value,
  data,
  disabled = false,
  containerStyle,
  textStyle,
  isVerticalButtons = false,
  vrButtonStyle,
  RadioButtonStyle,
  vrButtonContainerStyle,
  radioButtonContainerStyle,
  labelStyle,
}: ICustomRadioButtonProps) => {
  const radioButtonTheme = {colors: {primary: COLORS.dDarkGreen}};
  const errorTheme = {colors: {onSurface: COLORS.red}};

  return (
    <View style={containerStyle}>
      <View style={CommonStyles.flexRow}>
        <Text style={textStyle} variant={'bodyMedium'}>
          {title}
        </Text>
        {isRequired ? (
          <Text variant="labelMedium" theme={errorTheme}>
            {'*'}
          </Text>
        ) : null}
      </View>
      <RadioButton.Group onValueChange={onChange} value={value}>
        <View
          style={
            isVerticalButtons
              ? {...styles.radioButtonVerticalView, ...vrButtonContainerStyle}
              : {...styles.radioButtonView, ...radioButtonContainerStyle}
          }>
          {data?.length &&
            data.map((item, index) => (
              <View
                style={
                  isVerticalButtons
                    ? {
                        ...styles.verticalRadioButton,
                        ...vrButtonStyle,
                      }
                    : {...styles.radioButton, ...RadioButtonStyle}
                }
                key={index}>
                <RadioButton.Android
                  theme={radioButtonTheme}
                  value={item.value}
                  disabled={disabled}
                />
                <Text variant="bodyMedium" style={labelStyle}>
                  {item.label}
                </Text>
              </View>
            ))}
        </View>
      </RadioButton.Group>
    </View>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  radioButtonVerticalView: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: widthToRatio() * -8,
  },
  radioButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  verticalRadioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
});
