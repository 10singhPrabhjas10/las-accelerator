import Layout from 'components/Layout';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import CommonStyles from 'utils/commonStyle';
import {leaveStyles} from './leaves.styles';
import {styles} from '../attendance-checkin-checkout/checkinout.styles';
import {View} from 'react-native';
import moment from 'moment';
import {COLORS} from 'theme/colors';
import {MarkedDates} from 'react-native-calendars/src/types';
import {Formik} from 'formik';
import DropDown from 'components/dropdown/Dropdown';
import Spacer from 'components/spacer';
import DatePicker from 'components/datePicker/DatePicker';
import {convertDateToDisplay} from 'utils/commonMethods';
import CustomRadioButton from 'components/radioButton/CustomRadioButton';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {
  GET_ATTENDANCE_DATA,
  GET_LAS_PROFILE,
  SUBMIT_LEAVE_REQUEST,
} from 'services/constants';
import {GET, POST} from 'constants/httpConstants';
import NetworkRequest from 'services/networkRequest';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {useNavigation} from '@react-navigation/native';
import CommonCalendar from 'components/calendar/CommonCalendar';

export const AttendanceLeavesScreen = () => {
  const navigation = useNavigation();

  const [selectedValue, setSelectedValue] = useState(new Date());
  const [markedDate, setMarkedDate] = useState<MarkedDates>();
  const [showLeaveType, setShowLeaveType] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [availableLeaves, setAvailableLeaves] = useState(0);
  const [appliedLeaves, setAppliedLeaves] = useState(0);

  useEffect(() => {
    const loadLeaveData = async () => {
      try {
        const lasProfile = await NetworkRequest(GET, GET_LAS_PROFILE);

        if (lasProfile.data) {
          setAvailableLeaves(lasProfile.data.availableLeave ?? 0);
        }

        const selectedMonth = moment(selectedValue).get('month') + 1;

        const appliedLeaveApi = await NetworkRequest(
          POST,
          GET_ATTENDANCE_DATA,
          {
            month: selectedMonth,
            entryType: ['appliedLeave'],
          },
        );

        if (appliedLeaveApi && appliedLeaveApi?.data) {
          setAppliedLeaves(appliedLeaveApi?.data?.data.length);
        }
      } catch (error) {
        console.log('Error while loading Leave information');
      }
    };
    loadLeaveData();
  }, [selectedValue]);

  const submitLeaveRequest = async (values: {
    leaveType?: {value?: string; label?: string};
    fromDate?: string;
    toDate?: string;
    leaveDuration: string;
  }) => {
    setIsSubmitted(true);
    setShowSuccessModal(true);
    // try {
    //   const {leaveType, fromDate, toDate, leaveDuration} = values;

    //   const response = await NetworkRequest(POST, SUBMIT_LEAVE_REQUEST, {
    //     leaveType,
    //     fromDate: CalendarUtils.getCalendarDateString(fromDate),
    //     toDate: CalendarUtils.getCalendarDateString(toDate),
    //     leaveDuration,
    //   });
    //   if (response && response.data) {
    //     setIsSubmitted(true);
    //     setShowSuccessModal(true);
    //   }
    // } catch (error) {
    //   setIsSubmitted(false);
    //   setShowSuccessModal(true);
    // }
  };
  return (
    <Layout
      headerTitle={'Apply Leave'}
      style={[CommonStyles.padding16, leaveStyles.root]}
      isScrollable={true}>
      <CommonCalendar
        markedDates={markedDate || {}}
        selectedValue={selectedValue}
        onMonthChange={setSelectedValue}
        onDayPress={date => {
          setMarkedDate({
            [date.dateString]: {
              customStyles: {
                container: {
                  backgroundColor: COLORS.lightRed,
                },
              },
            },
          });
        }}
      />
      <View style={styles.daysInfoWrap}>
        <View
          style={[
            styles.infoWrap,
            styles.rightBorder,
            leaveStyles.diplayInfoBlock,
          ]}>
          <Text style={[styles.numberInfo, styles.present]}>
            {availableLeaves}
          </Text>
          <Text style={styles.numberTypeInfo}>Leaves Available</Text>
        </View>
        <View style={[styles.infoWrap, leaveStyles.diplayInfoBlock]}>
          <Text style={[styles.numberInfo, styles.pending]}>
            {appliedLeaves}
          </Text>
          <Text style={styles.numberTypeInfo}>Leaves Applied</Text>
        </View>
      </View>
      <Formik
        initialValues={{
          leaveType: {value: undefined, label: undefined},
          fromDate: undefined,
          toDate: undefined,
          leaveDuration: 'halfDay',
        }}
        onSubmit={values => submitLeaveRequest(values)}
        validateOnChange={true}
        validateOnBlur={false}>
        {({values, setFieldValue, handleSubmit}) => {
          return (
            <View style={leaveStyles.formContainer}>
              <View style={leaveStyles.formFieldsContainer}>
                <DropDown
                  value={values.leaveType}
                  list={[
                    {
                      label: 'Casual',
                      value: 'Casual',
                    },
                  ]}
                  label="Leave Type"
                  placeholder="Select Type"
                  isRequired
                  updateDisplayValue={value => value}
                  visible={showLeaveType}
                  onChangeDropdownState={() => {
                    setShowLeaveType(!showLeaveType);
                  }}
                  setValue={data => {
                    setFieldValue('leaveType', data);
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
                <CustomRadioButton
                  title="Type"
                  onChange={val => setFieldValue('leaveDuration', val)}
                  value={values.leaveDuration}
                  isRequired
                  data={[
                    {
                      value: 'halfDay',
                      label: 'Half Day',
                    },
                    {
                      value: 'fullDay',
                      label: 'Full Day',
                    },
                  ]}
                  containerStyle={leaveStyles.radioGroup}
                />
              </View>
              <CustomButton
                type={ButtonTypes.contained}
                text={'Submit'}
                onPress={handleSubmit}
                style={styles.checkBtn}
                isDisabled={
                  values.leaveDuration && values.leaveType ? false : true
                }
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
            ? 'You have successfully applied Leave'
            : 'Leave request failed'
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
