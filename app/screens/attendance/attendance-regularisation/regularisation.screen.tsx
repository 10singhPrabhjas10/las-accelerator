import Layout from 'components/Layout';
import React, {useCallback, useState} from 'react';
import {Text} from 'react-native-paper';
import CommonStyles from 'utils/commonStyle';
import {styles as regularisationStyles} from './attendance-regularisation.styles';
import {styles} from '../attendance-checkin-checkout/checkinout.styles';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import {Pressable, View} from 'react-native';
import moment from 'moment';
import RightArrowIcon from '../../../../assets/icons/bold-right-arrow.svg';
import LeftArrowIcon from '../../../../assets/icons/bold-arrow-left-.svg';
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

export const AttendanceRegularisationScreen = () => {
  const navigation = useNavigation();

  const [selectedValue, setSelectedValue] = useState(new Date());
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [locale, _setLocale] = useState('en-GB');
  const [markedDate, setMarkedDate] = useState<MarkedDates>({
    [CalendarUtils.getCalendarDateString(new Date())]: {
      customStyles: {
        container: {
          backgroundColor: COLORS.semanticYellow,
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
    try {
      const {type, fromDate, toDate, endTime, startTime} = values;

      const response = await NetworkRequest(
        POST,
        SUBMIT_REGULARISATION_REQUEST,
        {
          type: type,
          fromDate: CalendarUtils.getCalendarDateString(fromDate),
          toDate: CalendarUtils.getCalendarDateString(toDate),
          startTime: moment(
            `${startTime?.hours}:${startTime?.minutes}:00`,
            'H:mm:ss',
          ).format('HH:mm:ss'),
          endTime: moment(
            `${endTime?.hours}:${endTime?.minutes}:00`,
            'H:mm:ss',
          ).format('HH:mm:ss'),
        },
      );
      if (response && response.data) {
        setIsSubmitted(true);
        setShowSuccessModal(true);
      }
    } catch (error) {
      setIsSubmitted(false);
      setShowSuccessModal(true);
    }
  };

  const CustomHeaderTitle = (
    <View style={styles.calendarHeaderWrap}>
      <View style={styles.calenderTitleWrap}>
        <Text style={styles.calenderTitle}>
          {moment(selectedValue).format('ddd, MMM DD')}
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

  return (
    <Layout
      headerTitle={'Apply Regularisation'}
      style={[CommonStyles.padding16, regularisationStyles.root]}
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
                  backgroundColor: COLORS.semanticYellow,
                },
              },
            },
          });
        }}
        markedDates={markedDate}
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
        title={isSubmitted ? 'Submitted' : 'Failure'}
        label={
          isSubmitted
            ? 'You have successfully applied Regularisation'
            : 'Regularisation request could not be submitted'
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
