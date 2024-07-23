import {View} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useState} from 'react';
import {IBalanceModalProps} from '../../StoreCheckIn.interface';
import {StyleSheet} from 'react-native';
import DatePicker from 'components/datePicker/DatePicker';
import {convertDateToDisplay} from 'utils/commonMethods';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';

const BalanceModal = ({
  setShowModal,
  setShowSuccessModal,
  headerTitle,
  dateLabel,
  onSubmit,
}: IBalanceModalProps) => {
  const [date, setDate] = useState('');

  const Heading = ({title}: {title: string}) => (
    <View style={styles.heading}>
      <Text variant="titleLarge">{title}</Text>
      <Text variant="bodyMedium">Provide details to proceed</Text>
    </View>
  );

  const validRange = {
    startDate: new Date(), // Set minimum date to current date
    endDate: undefined, // No maximum date (open ended)
  };

  return (
    <View style={styles.Modal}>
      <Heading title={headerTitle} />

      <View style={styles.body}>
        <DatePicker
          isDatePickerEditable
          label={dateLabel}
          value={date ? convertDateToDisplay(date) : ''}
          onInputChange={val => {
            setDate(val);
          }}
          calendarMode="single"
          validRange={validRange}
        />
      </View>

      <View style={styles.buttonView}>
        <CustomButton
          type={ButtonTypes.outline}
          text="Dismiss"
          onPress={() => {
            setShowModal(false);
          }}
          style={styles.button}
        />
        <CustomButton
          type={ButtonTypes.contained}
          text="Create"
          onPress={() => {
            setShowModal(false);
            onSubmit(date);
          }}
          isDisabled={date.length === 0}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Modal: {
    marginHorizontal: 20,
  },
  heading: {
    alignItems: 'center',
    marginTop: 20,
  },
  body: {
    marginVertical: 20,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {width: '46%', padding: 4},
});

export default BalanceModal;
