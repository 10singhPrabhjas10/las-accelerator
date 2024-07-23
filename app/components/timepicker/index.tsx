import React, {useState} from 'react';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {View} from 'react-native';
import {TimePickerModal} from 'react-native-paper-dates';
import {COLORS} from 'theme/colors';
import {TextInput} from 'react-native-paper';

export interface ITimePicker {
  locale: string;
  onConfirmTime: (captured: {hours: number; minutes: number}) => void;
  time?: {hours: number; minutes: number};
  label: string;
  textFieldMode?: 'flat' | 'outlined';
  isTimePickerEditable?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  textInputStyle?: any;
  containerStyle?: any;
  isRequired?: boolean;
}

export const TimePicker = ({
  locale,
  onConfirmTime,
  time,
  label,
  textFieldMode = 'outlined',
  isTimePickerEditable = false,
  isDisabled = false,
  placeholder = 'Select Time',
  textInputStyle,
  containerStyle,
  isRequired,
}: ITimePicker) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOnDismiss = () => {
    setOpen(false);
  };

  const handleOnConfirm = (captured: {hours: number; minutes: number}) => {
    setOpen(false);
    onConfirmTime(captured);
  };

  return (
    <View style={containerStyle}>
      <PrimaryTextInput
        placeHolder={placeholder}
        theme={{
          colors: {
            background: isDisabled ? COLORS.lightGrey2 : COLORS.white,
          },
        }}
        titleText={label}
        onChangeText={() => {}}
        mode={textFieldMode}
        disabled={!isTimePickerEditable}
        value={time?.hours ? `${time?.hours}:${time?.minutes}` : ''}
        editable={false}
        right={
          <TextInput.Icon
            onPress={() => {
              isTimePickerEditable && setOpen(true);
            }}
            icon="calendar"
          />
        }
        isRequired={isRequired}
        textInputStyle={textInputStyle}
        keyboardType="number-pad"
      />
      <TimePickerModal
        locale={locale}
        visible={open}
        onDismiss={handleOnDismiss}
        onConfirm={handleOnConfirm}
        hours={time?.hours}
        minutes={time?.minutes}
      />
    </View>
  );
};
