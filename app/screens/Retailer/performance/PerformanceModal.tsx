import {View} from 'react-native';
import React, {SetStateAction, useState} from 'react';
import {StyleSheet} from 'react-native';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import DateRange from 'components/dateRange/DateRange';
import {ValidRangeEndDate, ValidRangeStartDate} from 'constants/dateFormat';
import CommonStyles from 'utils/commonStyle';

interface IPerformanceModalProps {
  setShowModal: SetStateAction<any>;
  onSubmit: (startDate: string, endDate: string) => void;
}

const PerformanceModal = ({setShowModal, onSubmit}: IPerformanceModalProps) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <View>
      <View style={styles.body}>
        <DateRange
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          validRangeStartDate={ValidRangeStartDate}
          validRangeEndDate={ValidRangeEndDate(startDate)}
          containerStyle={CommonStyles.flexOne}
          textInputStyle={{fontSize: 13}}
        />
      </View>

      <View style={styles.buttonView}>
        <CustomButton
          type={ButtonTypes.outline}
          text="Dismiss"
          onPress={() => {
            setShowModal(false);
          }}
          style={CommonStyles.flexOne}
        />
        <CustomButton
          type={ButtonTypes.contained}
          text="Submit"
          onPress={() => {
            setShowModal(false);
            onSubmit(startDate, endDate);
          }}
          isDisabled={startDate === '' || endDate === ''}
          style={CommonStyles.flexOne}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    marginVertical: 20,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 20,
  },
});

export default PerformanceModal;
