import Layout from 'components/Layout';
import React, {useCallback, useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import CommonStyles from 'utils/commonStyle';
import {leaveStyles} from './leaves.styles';
import {styles} from '../attendance-checkin-checkout/checkinout.styles';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import {Pressable, View} from 'react-native';
import moment from 'moment';
import RightArrowIcon from '../../../../assets/icons/bold-right-arrow.svg';
import LeftArrowIcon from '../../../../assets/icons/bold-arrow-left-.svg';
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

  const CustomHeaderTitle = (
    <View style={styles.calendarHeaderWrap}>
      <View style={styles.calenderTitleWrap}>
        <Text style={styles.calenderTitle}>
          {moment(Date.now()).format('ddd, MMM DD')}
        </Text>
      </View>
      <View style={styles.calendarSubTitleWrap}>
        <Pressable>
          <Text style={styles.monthDisplay}>
            {moment(selectedValue).format('MMMM')} {selectedValue.getFullYear()}
          </Text>
        </Pressable>
      </View>
    </View>
  );

  const handleArrowRender = (direction: string) => {
    return direction === 'left' ? (
      <LeftArrowIcon height={15} />
    ) : (
      <RightArrowIcon height={15} />
    );
  };

  const getNewSelectedDate = useCallback(
    (date: any, shouldAdd: boolean) => {
      const newMonth = new Date(date).getMonth();
      const month = shouldAdd ? newMonth + 1 : newMonth - 1;
      const newDate = new Date(selectedValue.setMonth(month));
      const newSelected = new Date(newDate.setDate(1));
      return newSelected;
    },
    [selectedValue],
  );

  const onPressArrowLeft = useCallback(
    (subtract: () => void, month: any) => {
      const newDate = getNewSelectedDate(month, false);
      setSelectedValue(newDate);
      subtract();
    },
    [getNewSelectedDate],
  );

  const onPressArrowRight = useCallback(
    (add: () => void, month: any) => {
      const newDate = getNewSelectedDate(month, true);
      setSelectedValue(newDate);
      add();
    },
    [getNewSelectedDate],
  );
  const submitLeaveRequest = async (values: {
    leaveType?: {value?: string; label?: string};
    fromDate?: string;
    toDate?: string;
    leaveDuration: string;
  }) => {
    try {
      const {leaveType, fromDate, toDate, leaveDuration} = values;

      const response = await NetworkRequest(POST, SUBMIT_LEAVE_REQUEST, {
        leaveType,
        fromDate: CalendarUtils.getCalendarDateString(fromDate),
        toDate: CalendarUtils.getCalendarDateString(toDate),
        leaveDuration,
      });
      if (response && response.data) {
        setIsSubmitted(true);
        setShowSuccessModal(true);
      }
    } catch (error) {
      setIsSubmitted(false);
      setShowSuccessModal(true);
    }
  };
  return (
    <Layout
      headerTitle={'Apply Leave'}
      style={[CommonStyles.padding16, leaveStyles.root]}
      isScrollable={true}>
      <Calendar
        mode="multiple"
        current={CalendarUtils.getCalendarDateString(Date.now())}
        enableSwipeMonths
        markingType="custom"
        customHeaderTitle={CustomHeaderTitle}
        onPressArrowLeft={onPressArrowLeft}
        onPressArrowRight={onPressArrowRight}
        hideExtraDays={true}
        theme={{
          todayTextColor: COLORS.black,
          textDayStyle: {
            textTransform: 'capitalize',
          },
          textDayFontFamily: 'soleto_regular',
          textDayHeaderFontSize: 16,
          textSectionTitleColor: COLORS.black,
          arrowStyle: {
            padding: 0,
            marginTop: 8,
            justifyContent: 'center',
          },
        }}
        renderArrow={handleArrowRender}
        style={styles.calendarContainer}
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
        markedDates={markedDate}
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
        title={isSubmitted ? 'Submitted' : 'Failure'}
        label={
          isSubmitted
            ? 'You have successfully applied Leave'
            : 'Leave request failed'
        }
        onSecondaryBtnHandler={() => {
          setShowSuccessModal(false);
          if (isSubmitted) {
            navigation.navigate('AttendanceLanding' as never);
          }
        }}
        setShowModal={() => setShowSuccessModal(false)}
        showModal={showSuccessModal}
        isSuccess={isSubmitted}
      />
    </Layout>
  );
};
