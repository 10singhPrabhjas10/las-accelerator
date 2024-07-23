import {StyleSheet, View} from 'react-native';
import React, {SetStateAction, useState} from 'react';
import {Text} from 'react-native-paper';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import DropDown from 'components/dropdown/Dropdown';
import DatePicker from 'components/datePicker/DatePicker';
import {convertDateToDisplay, reFormatDate} from 'utils/commonMethods';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import Spacer from 'components/spacer';
import moment from 'moment';
import {DateFormats} from 'constants/dateFormat';

interface DayOfWeekMap {
  [key: string]: number;
}

interface IRecurrenceModalProps {
  setShowModal: SetStateAction<any>;
  setShowSuccessModal: SetStateAction<any>;
  recCardData: {cardName: string; code: string};
  dateData: string;
  submitRecurrenceValues: (
    recurrence: string,
    day: string,
    recurringDates: string[],
    endDate: string,
    recCardData: {cardName: string; code: string},
  ) => void;
}

const DATA = [
  {value: 'Weekly', label: 'Weekly'},
  {value: 'Fortnightly', label: 'Fortnightly'},
];

const DayData = [
  {value: 'Sunday', label: 'Sunday'},
  {value: 'Monday', label: 'Monday'},
  {value: 'Tuesday', label: 'Tuesday'},
  {value: 'Wednesday', label: 'Wednesday'},
  {value: 'Thursday', label: 'Thursday'},
  {value: 'Friday', label: 'Friday'},
  {value: 'Saturday', label: 'Saturday'},
];

const dayOfWeekStringToNumber: DayOfWeekMap = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const RecurranceModal = ({
  setShowModal,
  setShowSuccessModal,
  recCardData,
  dateData,
  submitRecurrenceValues,
}: IRecurrenceModalProps) => {
  const [recurrence, setRecurrence] = useState('');
  const [showRecurrenceDropdown, setShowRecurrenceDropdown] = useState(false);

  const formatDate = (inputDate: string) => {
    const parsedDate = moment(inputDate, DateFormats.Do_MMMM_YYYY);

    // Format the parsed date as 'YYYY-MM-DD'
    const formattedDate = parsedDate.format(DateFormats.YYYY_MM_DD);
    return formattedDate;
  };

  const [day, setDay] = useState('');
  const [showDayDropdown, setShowDropdown] = useState(false);
  const [date, setDate] = useState('');

  const currentDate = new Date();

  const parsedDate = moment(dateData, DateFormats.Do_MMMM_YYYY);
  const desiredDateString = parsedDate
    .date(30)
    .startOf('day')
    .hour(18)
    .minute(30)
    .toISOString();

  const originalDate = moment(dateData, DateFormats.Do_MMMM_YYYY);

  const startOfMonth = originalDate.clone().startOf('month').toDate();

  // Get the end of the month for the original date
  const endOfMonth = originalDate.clone().endOf('month').toDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1,
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 2,
    0,
  );

  const validRange = {
    startDate: startOfMonth,
    endDate: endOfMonth,
  };

  const calculateRecurringDates = (
    startDate: string,
    recurrence: string,
    dayOfWeek: number,
    endDate: moment.Moment,
  ) => {
    const recurringDates = [];
    let currentDate = moment(startDate);
    let recurrenceMode = recurrence === 'Weekly' ? 1 : 2;

    if (recurrence === 'Daily') {
      while (currentDate.isSameOrBefore(endDate)) {
        recurringDates.push(currentDate.format(DateFormats.YYYY_MM_DD));
        currentDate = currentDate.add(1, 'days');
      }
    } else {
      while (currentDate.isSameOrBefore(endDate)) {
        if (currentDate.day() !== dayOfWeek && recurrenceMode !== 3) {
          const daysToAdd = (dayOfWeek - currentDate.day() + 7) % 7;
          currentDate = currentDate.add(daysToAdd, 'days');
        }
        recurringDates.push(currentDate.format(DateFormats.YYYY_MM_DD));
        currentDate = currentDate.add(recurrenceMode, 'weeks');
      }
    }

    return recurringDates;
  };

  const convertDayOfWeekToNumber = (dayOfWeekString: string): number => {
    return dayOfWeekStringToNumber[dayOfWeekString as keyof DayOfWeekMap];
  };

  const recurringDates = calculateRecurringDates(
    formatDate(dateData),
    recurrence,
    convertDayOfWeekToNumber(day),
    moment(date, DateFormats.YYYY_MM_DD),
  );

  return (
    <>
      <View style={styles.Modal}>
        <Text variant="titleLarge">Recurrence</Text>
        <Text variant="bodyMedium">Select option to schedule recurrence</Text>
      </View>
      <Spacer size={24} />
      <PrimaryTextInput
        titleText="Date"
        value={reFormatDate(dateData)}
        disabled
        onChangeText={() => {}}
      />
      <Spacer size={24} />
      <PrimaryTextInput
        titleText="Customer Name"
        value={recCardData?.cardName}
        disabled
        onChangeText={() => {}}
      />
      <Spacer size={24} />
      <DropDown
        value={recurrence}
        list={DATA}
        label="Recurrence Pattern"
        placeholder="Recurrence Pattern"
        isRequired
        visible={showRecurrenceDropdown}
        onChangeDropdownState={() => {
          setShowRecurrenceDropdown(!showRecurrenceDropdown);
        }}
        setValue={data => {
          setRecurrence(data);
        }}
      />
      <Spacer size={24} />
      <DropDown
        value={day}
        list={DayData ?? []}
        label="Select Day"
        placeholder="Day"
        isRequired
        visible={showDayDropdown}
        onChangeDropdownState={() => {
          setShowDropdown(!showDayDropdown);
        }}
        setValue={data => {
          setDay(data);
        }}
      />
      <Spacer size={24} />
      <Text variant="bodyMedium">End After: Occurences {'*'}</Text>
      <Spacer size={4} />
      <DatePicker
        label={''}
        calendarMode="single"
        placeholder={'Date'}
        value={date ? convertDateToDisplay(date) : ''}
        onInputChange={val => {
          setDate(val);
        }}
        validRange={validRange}
        isDatePickerEditable={true}
      />

      <View style={styles.buttonView}>
        <CustomButton
          type={ButtonTypes.outline}
          text="Dismiss"
          onPress={() => setShowModal(false)}
          style={styles.button}
        />
        <CustomButton
          type={ButtonTypes.contained}
          text="Confirm"
          onPress={() => {
            setShowModal(false);
            setShowSuccessModal(true);
            submitRecurrenceValues(
              recurrence,
              day,
              recurringDates,
              date,
              recCardData,
            );
          }}
          isDisabled={date === '' || day === '' || recurrence === ''}
          style={styles.button}
        />
      </View>
    </>
  );
};

export default RecurranceModal;

const styles = StyleSheet.create({
  Modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
    gap: 25,
  },
  button: {padding: 4, flex: 1},
});
