import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import React from 'react';
import {RadioButton, Text} from 'react-native-paper';

import {COLORS} from 'theme/colors';
import CommonStyles from 'utils/commonStyle';

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
  textStyle?: TextStyle;
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
}: ICustomRadioButtonProps) => {
  const radioButtonTheme = {colors: {primary: COLORS.darkYellow}};
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
              ? styles.radioButtonVerticalView
              : styles.radioButtonView
          }>
          {data?.length &&
            data.map((item, index) => (
              <View style={styles.radioButton} key={index}>
                <RadioButton.Android
                  theme={radioButtonTheme}
                  value={item.value}
                  disabled={disabled}
                />
                <Text variant="bodyMedium">{item.label}</Text>
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
  },
  radioButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
});
