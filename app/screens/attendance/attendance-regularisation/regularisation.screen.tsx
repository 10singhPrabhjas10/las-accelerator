import Layout from 'components/Layout';
import React, {useState, useEffect} from 'react';
import CommonStyles from 'utils/commonStyle';
import {styles as regularisationStyles} from './attendance-regularisation.styles';
import {styles} from '../attendance-checkin-checkout/checkinout.styles';
import {CalendarUtils} from 'react-native-calendars';
import {View} from 'react-native';
import {COLORS} from 'theme/colors';
import {Formik} from 'formik';
import DatePicker from 'components/datePicker/DatePicker';
import {convertDateToDisplay} from 'utils/commonMethods';
import {TimePicker} from 'components/timepicker';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import Spacer from 'components/spacer';
import NetworkRequest from 'services/networkRequest';
import {POST} from 'constants/httpConstants';
import {SUBMIT_REGULARISATION_REQUEST} from 'services/constants';
import {MarkedDates} from 'react-native-calendars/src/types';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {useNavigation} from '@react-navigation/native';
import DropDown from 'components/dropdown/Dropdown';
import CommonCalendar from 'components/calendar/CommonCalendar';

export const AttendanceRegularisationScreen = () => {
  const navigation = useNavigation();

  const [selectedValue, setSelectedValue] = useState(new Date());
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [locale, _setLocale] = useState('en-GB');

  // useEffect(() => {
  //   setMarkedDate({
  //     [CalendarUtils.getCalendarDateString(selectedValue)]: {
  //       customStyles: {
  //         container: {
  //           backgroundColor: COLORS.semanticChilliRed,
  //         },
  //       },
  //     },
  //   });
  // }, [selectedValue]);

  const [markedDate, setMarkedDate] = useState<MarkedDates>({
    [CalendarUtils.getCalendarDateString(new Date())]: {
      customStyles: {
        container: {
          backgroundColor: COLORS.semanticChilliRed,
        },
      },
    },
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitRegularisationRequest = async (values: {
    type: {value: string; label: string};
    fromDate: string;
    toDate: string;
    startTime?: {hours?: string; minutes?: string};
    endTime?: {hours?: string; minutes?: string};
  }) => {
    setIsSubmitted(true);
    setShowSuccessModal(true);

    // try {
    //   const {type, fromDate, toDate, endTime, startTime} = values;
    //   const response = await NetworkRequest(
    //     POST,
    //     SUBMIT_REGULARISATION_REQUEST,
    //     {
    //       type: type,
    //       fromDate: CalendarUtils.getCalendarDateString(fromDate),
    //       toDate: CalendarUtils.getCalendarDateString(toDate),
    //       startTime: moment(
    //         `${startTime?.hours}:${startTime?.minutes}:00`,
    //         'H:mm:ss',
    //       ).format('HH:mm:ss'),
    //       endTime: moment(
    //         `${endTime?.hours}:${endTime?.minutes}:00`,
    //         'H:mm:ss',
    //       ).format('HH:mm:ss'),
    //     },
    //   );
    //   if (response && response.data) {
    //     setIsSubmitted(true);
    //     setShowSuccessModal(true);
    //   }
    // } catch (error) {
    //   setIsSubmitted(false);
    //   setShowSuccessModal(true);
    // }
  };

  useEffect(() => {
    setMarkedDate({
      [CalendarUtils.getCalendarDateString(selectedValue)]: {
        customStyles: {
          container: {
            backgroundColor: COLORS.semanticChilliRed,
          },
        },
      },
    });
  }, [selectedValue]);

  return (
    <Layout
      headerTitle={'Apply Regularisation'}
      style={[CommonStyles.padding16, regularisationStyles.root]}
      isScrollable={true}>
      <CommonCalendar
        markedDates={markedDate}
        selectedValue={selectedValue}
        onMonthChange={setSelectedValue}
        onDayPress={date => setSelectedValue(new Date(date.dateString))}
      />

      <Formik
        initialValues={{
          type: {value: '', label: ''},
          fromDate: '',
          toDate: '',
          startTime: undefined,
          endTime: undefined,
        }}
        validateOnChange={true}
        validateOnBlur={false}
        validate={values => {}}
        onSubmit={values => {
          submitRegularisationRequest(values);
        }}>
        {({values, handleSubmit, setFieldValue}) => {
          return (
            <View style={regularisationStyles.formContainer}>
              <View style={regularisationStyles.formFieldsContainer}>
                <DropDown
                  label="Regularisation Type"
                  value={values.type}
                  list={[
                    {
                      label: 'Present',
                      value: 'Present',
                    },
                    {
                      label: 'Weekly-Off',
                      value: 'Weekly-Off',
                    },
                    {
                      label: 'Public Holiday',
                      value: 'Public Holiday',
                    },
                  ]}
                  placeholder="Select Type"
                  isRequired
                  updateDisplayValue={value => value}
                  visible={showDistrictDropdown}
                  onChangeDropdownState={() => {
                    setShowDistrictDropdown(!showDistrictDropdown);
                  }}
                  setValue={data => {
                    setFieldValue('type', data);
                  }}
                  dropDownItemSelectedStyle={{
                    backgroundColor: COLORS.backgroundDgreen,
                  }}
                />
                <Spacer size={12} />
                <DatePicker
                  label={'From Date'}
                  calendarMode="single"
                  placeholder={'Select Date'}
                  value={
                    values.fromDate ? convertDateToDisplay(values.fromDate) : ''
                  }
                  onInputChange={val => {
                    setFieldValue('fromDate', val);
                  }}
                  isDatePickerEditable={true}
                />
                <Spacer size={12} />
                <DatePicker
                  label={'To Date'}
                  calendarMode="single"
                  placeholder={'Select Date'}
                  value={
                    values.toDate ? convertDateToDisplay(values.toDate) : ''
                  }
                  onInputChange={val => {
                    setFieldValue('toDate', val);
                  }}
                  isDatePickerEditable={true}
                />
                <Spacer size={12} />
                <TimePicker
                  label="Start Time"
                  placeholder="Select Time"
                  textFieldMode="outlined"
                  locale={locale}
                  onConfirmTime={captured => {
                    setFieldValue('startTime', captured);
                  }}
                  time={values.startTime}
                  isTimePickerEditable={true}
                />
                <Spacer size={12} />
                <TimePicker
                  label="End Time"
                  placeholder="Select Time"
                  textFieldMode="outlined"
                  locale={locale}
                  onConfirmTime={captured => {
                    setFieldValue('endTime', captured);
                  }}
                  time={values.endTime}
                  isTimePickerEditable={true}
                />
              </View>
              <CustomButton
                type={ButtonTypes.contained}
                text={'Submit'}
                onPress={handleSubmit}
                style={styles.checkBtn}
                isDisabled={values.type.value !== '' ? false : true}
              />
            </View>
          );
        }}
      </Formik>
      <SuccessFailureModal
        btnType="confirm"
        secondaryBtnTitle={'Dismiss'}
        title={isSubmitted ? 'Applied' : 'Failure'}
        label={
          isSubmitted
            ? 'You have successfully applied Regularisation'
            : 'Regularisation request could not be submitted'
        }
        onSecondaryBtnHandler={() => {
          setShowSuccessModal(false);
          if (isSubmitted) {
            navigation.navigate('AttendanceManagement' as never, {selectedCard: 'leaves'} as never);
          }
        }}
        setShowModal={() => setShowSuccessModal(false)}
        showModal={showSuccessModal}
        isSuccess={isSubmitted}
      />
    </Layout>
  );
};
