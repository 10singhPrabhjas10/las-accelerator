import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import DatePicker from 'components/datePicker/DatePicker';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import Spacer from 'components/spacer';

type ValidRange = {
  startDate: Date;
  endDate: Date;
};

interface ICustomRangeProps {
  startDate: string;
  setStartDate: (val: string) => void;
  endDate: string;
  setEndDate: (val: string) => void;
  validRangeStartDate?: ValidRange;
  validRangeEndDate?: ValidRange;
  containerStyle?: ViewStyle;
  dateViewStyle?: ViewStyle;
  textInputStyle?: TextStyle;
}

const DateRange = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  validRangeStartDate,
  validRangeEndDate,
  containerStyle,
  dateViewStyle,
  textInputStyle,
}: ICustomRangeProps) => {
  return (
    <View style={dateViewStyle}>
      <Text variant="bodyMedium">{getTranslationLabel('custom_range')}</Text>
      <Spacer size={10} />
      <View style={styles.dateRangeFilter}>
        <DatePicker
          label={''}
          calendarMode="single"
          placeholder={getTranslationLabel('from_date')}
          value={startDate ? convertDateToDisplay(startDate) : ''}
          onInputChange={val => {
            setStartDate(val);
          }}
          validRange={validRangeStartDate}
          isDatePickerEditable
          containerStyle={containerStyle}
          textInputStyle={textInputStyle}
        />
        <DatePicker
          label={''}
          calendarMode="single"
          placeholder={getTranslationLabel('to_date')}
          value={endDate ? convertDateToDisplay(endDate) : ''}
          onInputChange={val => {
            setEndDate(val);
          }}
          validRange={validRangeEndDate}
          isDatePickerEditable
          containerStyle={containerStyle}
          textInputStyle={textInputStyle}
        />
      </View>
    </View>
  );
};

export default DateRange;

const styles = StyleSheet.create({
  dateRangeFilter: {
    flexDirection: 'row',
    gap: 20,
  },
});
