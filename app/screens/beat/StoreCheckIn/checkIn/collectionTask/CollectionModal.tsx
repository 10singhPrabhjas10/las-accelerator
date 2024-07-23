import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Divider, Text, TextInput} from 'react-native-paper';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import DatePicker from 'components/datePicker/DatePicker';
import {convertDateToDisplay} from 'utils/commonMethods';
import CommonStyles from 'utils/commonStyle';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {ICollectionModalProps} from '../../StoreCheckIn.interface';
import Spacer from 'components/spacer';

interface IHeadingProps {
  title: string;
}

const CollectionModal = ({
  setShowModal,
  setShowSuccessModal,
  onSubmit,
  isChannelFinanceCustomer,
}: ICollectionModalProps) => {
  const [vigilDate, setVigilDate] = useState('');
  const [vigilPayment, setVigilPayment] = useState('');

  const [channelDate, setChannelDate] = useState('');
  const [channlePayment, setChannelPayment] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const isChannelDisabled = isChannelFinanceCustomer
      ? channelDate !== '' && channlePayment?.length > 0
      : true;
    const buttonDisabled =
      vigilDate !== '' && vigilPayment?.length > 0 && isChannelDisabled;
    setIsButtonDisabled(!buttonDisabled);
  }, [vigilDate, vigilPayment, channelDate, channlePayment]);

  const validRange = {
    startDate: new Date(), // Set minimum date to current date
    endDate: undefined, // No maximum date (open ended)
  };

  const Heading = ({title}: IHeadingProps) => (
    <View style={styles.heading}>
      <Text variant="titleLarge">{title}</Text>
      <Text variant="bodyMedium">Provide details to proceed</Text>
    </View>
  );

  return (
    <View style={styles.Modal}>
      <Spacer size={16} />
      <Heading title="VGIL Collection" />
      <View>
        <Spacer size={16} />
        <PrimaryTextInput
          titleText="Payment Value"
          onChangeText={val => {
            setVigilPayment(val);
          }}
          value={vigilPayment}
          placeHolder="Enter Payment Value"
          keyboardType="number-pad"
          left={vigilPayment && <TextInput.Affix text="₹" />}
        />
        <Spacer size={16} />
        <DatePicker
          isDatePickerEditable
          label="Payment Date"
          value={vigilDate ? convertDateToDisplay(vigilDate) : ''}
          onInputChange={val => {
            setVigilDate(val);
          }}
          calendarMode="single"
          validRange={validRange}
        />
        <Spacer size={10} />
      </View>
      <Divider style={CommonStyles.horizontalDivider} />
      {isChannelFinanceCustomer && (
        <>
          <Heading title="Channel Finance Collection" />
          <View>
            <Spacer size={16} />
            <PrimaryTextInput
              titleText="Payment Value"
              onChangeText={val => {
                setChannelPayment(val);
              }}
              value={channlePayment}
              placeHolder="Enter Payment Value"
              keyboardType="number-pad"
              left={channlePayment && <TextInput.Affix text="₹" />}
            />
            <Spacer size={16} />
            <DatePicker
              isDatePickerEditable
              label="Payment Date"
              value={channelDate ? convertDateToDisplay(channelDate) : ''}
              onInputChange={val => {
                setChannelDate(val);
              }}
              calendarMode="single"
              validRange={validRange}
            />
          </View>
        </>
      )}
      <Spacer size={16} />
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
          text="Confirm"
          onPress={() => {
            setShowModal(false);
            onSubmit(vigilPayment, vigilDate, channlePayment, channelDate);
          }}
          style={styles.button}
          isDisabled={isButtonDisabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Modal: {
    marginHorizontal: 10,
  },
  heading: {
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {width: '46%'},
});

export default CollectionModal;
