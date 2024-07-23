import {TextStyle, View, ViewStyle} from 'react-native';
import React, {useCallback, useState} from 'react';
import {DatePickerModal, registerTranslation} from 'react-native-paper-dates';
import {TextInput} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import {DateFormats} from 'constants/dateFormat';
import {ValidRangeType} from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';

interface IDatePickerProps {
  label: string;
  textFieldMode?: 'outlined' | 'flat' | undefined;
  calendarMode?: 'single' | 'multiple' | 'range';
  value: string;
  isDatePickerEditable: boolean;
  onInputChange: (val: string) => void;
  animationType?: 'none' | 'slide' | 'fade';
  isDisabled?: boolean;
  placeholder?: string;
  validRange?: ValidRangeType;
  textInputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  isRequired?: boolean;
}

const DatePicker = ({
  label,
  textFieldMode = 'outlined',
  calendarMode = 'single',
  value,
  isDatePickerEditable = false,
  onInputChange,
  animationType = 'slide',
  isDisabled = false,
  placeholder,
  validRange,
  textInputStyle,
  containerStyle,
  isRequired,
}: IDatePickerProps) => {
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState<boolean>(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    params => {
      setOpen(false);
      setDate(params.date);
      onInputChange(params.date);
    },
    [setOpen, setDate, onInputChange],
  );

  registerTranslation('en', {
    save: 'Save',
    selectSingle: 'Select date',
    selectMultiple: 'Select dates',
    selectRange: 'Select period',
    notAccordingToDateFormat: inputFormat =>
      `Date format must be ${inputFormat}`,
    mustBeHigherThan: date => `Must be later then ${date}`,
    mustBeLowerThan: date => `Must be earlier then ${date}`,
    mustBeBetween: (startDate, endDate) =>
      `Must be between ${startDate} - ${endDate}`,
    dateIsDisabled: 'Day is not allowed',
    previous: 'Previous',
    next: 'Next',
    typeInDate: 'Type in date',
    pickDateFromCalendar: 'Pick date from calendar',
    close: 'Close',
    hour: 'Hour',
    minute: 'Minute',
  });

  return (
    <View style={containerStyle}>
      <PrimaryTextInput
        placeHolder={placeholder ?? DateFormats.DD_MM_YYYY}
        theme={{
          colors: {
            background: isDisabled ? COLORS.lightGrey2 : COLORS.white,
          },
        }}
        titleText={label}
        onChangeText={() => {}}
        mode={textFieldMode}
        disabled={!isDatePickerEditable}
        value={value}
        editable={false}
        right={
          <TextInput.Icon
            onPress={() => {
              isDatePickerEditable && setOpen(true);
            }}
            icon="calendar"
          />
        }
        isRequired={isRequired}
        textInputStyle={textInputStyle ?? {fontSize: 15}}
        keyboardType="number-pad"
      />
      <DatePickerModal
        locale="en"
        mode={calendarMode}
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        label="Select Date"
        saveLabel="Save"
        onConfirm={onConfirmSingle}
        animationType={animationType}
        presentationStyle="pageSheet"
        validRange={validRange}
      />
    </View>
  );
};

export default DatePicker;
