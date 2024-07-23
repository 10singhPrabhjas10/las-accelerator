import Layout from 'components/Layout';
import React, {useCallback, useEffect, useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import {COLORS} from 'theme/colors';
import {Pressable, Text} from 'react-native';
import {View} from 'react-native';
import {styles} from './checkinout.styles';
import moment from 'moment';
import RightArrowIcon from '../../../../assets/icons/bold-right-arrow.svg';
import LeftArrowIcon from '../../../../assets/icons/bold-arrow-left-.svg';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import Spacer from 'components/spacer';
import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import NetworkRequest from 'services/networkRequest';
import {POST} from 'constants/httpConstants';
import {GET_ATTENDANCE_DATA, SUBMIT_ATTENDANCE} from 'services/constants';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {useNavigation} from '@react-navigation/native';
import {getTranslationLabel} from 'utils/commonMethods';

type DayInfo = {
  date?: string;
  time?: string;
  location?: string;
  isCheckIn?: boolean;
};

interface IScheduleInfo {
  type: string;
  date: string;
  [key: string]: string | number;
}

export const CheckInCheckOutScreen = () => {
  const navigation = useNavigation();

  const [checkinInfo, setCheckIn] = useState<DayInfo | undefined>();
  const [checkoutInfo, setCheckOut] = useState<DayInfo | undefined>();
  const [calendarData, setCalendarData] = useState<{[key: string]: object}>();
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [totalRegularized, setTotalRegularized] = useState(0);
  const [totalcheckedIn, setTotalcheckedIn] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [scheduleInfo, setScheduleInfo] = useState<IScheduleInfo[]>([]);

  const getCalendarInfo = useCallback(async () => {
    try {
      const selectedMonth = moment(selectedValue).get('month') + 1;

      const response = await NetworkRequest(POST, GET_ATTENDANCE_DATA, {
        month: selectedMonth,
      });

      if (response && response?.data) {
        setScheduleInfo(response?.data?.data ?? []);
      }
    } catch (error) {
      console.log('Calendar data could not be loaded ===>', error);
    }
  }, [selectedValue]);

  useEffect(() => {
    getCalendarInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scheduleInfo?.length) {
      marked(scheduleInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleInfo]);

  const findTodayStatus = () => {
    try {
      const today = CalendarUtils.getCalendarDateString(new Date());

      const [dateRecord] = scheduleInfo.filter(rec => rec.date === today);

      if (dateRecord) {
        const {
          checkInTime,
          checkOutTime,
          checkInLocation,
          date,
          checkOutLocation,
        } = dateRecord;

        if (checkInTime) {
          setCheckIn({
            ...checkinInfo,
            date,
            time: checkInTime as string,
            location: checkInLocation as string,
          });
        }
        if (checkOutTime) {
          setCheckOut({
            ...checkoutInfo,
            date,
            time: checkOutTime as string,
            location: checkOutLocation as string,
          });
        }
      }
    } catch (error) {
      console.log('Error in findTodayStatus()', error);
    }
  };

  const marked = (dates: {[key: string]: any}[]) => {
    const dateMarkings: {[key: string]: object} = {};

    const createColorMarking = (color: string) => {
      return {
        customStyles: {
          container: {
            backgroundColor: color,
          },
        },
      };
    };

    // find if today is checked In
    findTodayStatus();

    let regularizedDates = 0;
    let appliedLeave = 0;
    let checkedIn = 0;
    dates.forEach(dt => {
      const day: string = CalendarUtils.getCalendarDateString(dt.date);

      switch (dt.type) {
        case 'regularizedDates':
          dateMarkings[day] = createColorMarking(COLORS.lightOrange2);
          regularizedDates = regularizedDates + 1;
          break;
        case 'appliedLeave':
          dateMarkings[day] = createColorMarking(COLORS.olympicBlue);
          appliedLeave = appliedLeave + 1;
          break;
        case 'checkedIn':
          checkedIn = checkedIn + 1;
          dateMarkings[day] = createColorMarking(COLORS.kellyGreen);
      }
    });
    setTotalRegularized(regularizedDates);
    setTotalcheckedIn(checkedIn);
    setTotalLeaves(appliedLeave);

    setCalendarData(dateMarkings);
  };

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

  const getNow = () => ({
    date: moment().format('DD MMM YYYY'),
    time: moment().format('h:mm a'),
  });

  const getHere = (
    cb: (response: GeolocationResponse) => void,
    cbError: (error: GeolocationError) => void,
  ) => {
    let location;

    Geolocation.getCurrentPosition(cb, cbError, {
      enableHighAccuracy: true,
    });

    return location;
  };

  const handleCheckIn = () => {
    try {
      const checkInTime = getNow();
      let location: string;

      const handleLocationResponse = (response: GeolocationResponse) => {
        location = `lat=${response.coords.latitude}&lng=${response.coords.longitude}`;
        setCheckIn({
          ...checkinInfo,
          date: checkInTime.date,
          time: checkInTime.time,
          location: location,
          isCheckIn: true,
        });
      };

      const handleLocationError = (_error: GeolocationError) => {
        setCheckIn({
          ...checkinInfo,
          date: checkInTime.date,
          time: checkInTime.time,
          location: location ?? 'LOCATION_FETCH_FAILED',
          isCheckIn: true,
        });
      };

      getHere(handleLocationResponse, handleLocationError);
    } catch (error) {
      // handle error
    }
  };

  const handleCheckOut = () => {
    try {
      const checkOutTime = getNow();
      let location: string;

      const handleLocationResponse = (response: GeolocationResponse) => {
        location = `lat=${response.coords.latitude}&lng=${response.coords.longitude}`;
        setCheckOut({
          ...checkinInfo,
          time: checkOutTime.time,
          date: checkOutTime.date,
          location: location,
          isCheckIn: false,
        });
      };

      const handleLocationError = (_error: GeolocationError) => {
        setCheckOut({
          ...checkinInfo,
          time: checkOutTime.time,
          date: checkOutTime.date,
          location: location ?? 'LOCATION_FETCH_FAILED',
          isCheckIn: false,
        });
      };
      getHere(handleLocationResponse, handleLocationError);
    } catch (error) {
      // handle error
    }
  };

  const disableCheckInBtn = !checkinInfo ? false : true;
  const disableCheckoutBtn = checkinInfo && !checkoutInfo ? false : true;

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

  const attendanceSubmitHandler = async () => {
    try {
      const submitDate = checkinInfo?.isCheckIn
        ? checkinInfo?.date
        : !checkoutInfo?.isCheckIn
        ? checkoutInfo?.date
        : checkinInfo?.date;
      const momentDate = moment(submitDate, 'DD MMM YYYY').format('YYYY-MM-DD');

      const body: {[key: string]: string} = {
        date: momentDate,
      };

      if (checkinInfo && checkinInfo?.time) {
        body.checkInTime = moment(checkinInfo.time, 'HH:mm:ss', true).isValid()
          ? checkinInfo.time
          : moment(checkinInfo.time, 'h:mm A').format('HH:mm:ss');
        body.checkInLocation = checkinInfo.location ?? 'LOCATION_FETCH_FAILED';
      }

      if (checkoutInfo && checkoutInfo?.time) {
        body.checkOutTime = moment(
          checkoutInfo.time,
          'HH:mm:ss',
          true,
        ).isValid()
          ? checkoutInfo.time
          : moment(checkoutInfo.time, 'h:mm A').format('HH:mm:ss');
        body.checkOutLocation = checkoutInfo.location ?? '';
      }

      const response = await NetworkRequest(POST, SUBMIT_ATTENDANCE, body);

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
      headerTitle={getTranslationLabel('check_in_check_out')}
      style={[CommonStyles.padding16, styles.root]}
      isScrollable={true}>
      <Calendar
        mode="multiple"
        current={CalendarUtils.getCalendarDateString(Date.now())}
        enableSwipeMonths
        markingType="custom"
        markedDates={calendarData}
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
      />

      <View style={styles.daysInfoWrap}>
        <View style={[styles.infoWrap, styles.rightBorder]}>
          <Text style={[styles.numberInfo, styles.present]}>
            {totalcheckedIn}
          </Text>
          <Text style={styles.numberTypeInfo}>
            {getTranslationLabel('present')}
          </Text>
        </View>
        <View style={[styles.infoWrap, styles.rightBorder]}>
          <Text style={[styles.numberInfo, styles.pending]}>
            {totalRegularized}
          </Text>
          <Text style={styles.numberTypeInfo}>
            {getTranslationLabel('pending')}
          </Text>
        </View>
        <View style={styles.infoWrap}>
          <Text style={[styles.numberInfo, styles.holiday]}>{totalLeaves}</Text>
          <Text style={styles.numberTypeInfo}>Holiday</Text>
        </View>
      </View>
      <View />

      <View style={styles.formWrap}>
        <Text style={styles.formTitle}>Attendance for the Day</Text>
        <PrimaryTextInput
          titleText="Check-in"
          placeHolder=""
          onChangeText={() => {}}
          value={checkinInfo?.time}
          isRequired={true}
          style={styles.inputBox}
          disabled
        />
        <PrimaryTextInput
          titleText="Check-In Location"
          placeHolder=""
          onChangeText={() => {}}
          value={checkinInfo?.location}
          isRequired={true}
          style={styles.inputBox}
          disabled
        />
        <Spacer size={32} />

        <PrimaryTextInput
          titleText="Check-Out"
          placeHolder=""
          onChangeText={() => {}}
          value={checkoutInfo?.time}
          isRequired={true}
          style={styles.inputBox}
          disabled
        />
        <PrimaryTextInput
          titleText="Check-Out Location"
          placeHolder=""
          onChangeText={() => undefined}
          value={checkoutInfo?.location}
          isRequired={true}
          style={styles.inputBox}
          disabled
        />
        <View style={styles.checkInOutBtnWrap}>
          <CustomButton
            type={ButtonTypes.outline}
            text={'Check-In'}
            onPress={handleCheckIn}
            style={styles.checkBtn}
            isDisabled={disableCheckInBtn}
          />
          <CustomButton
            type={ButtonTypes.outline}
            text={'Check-Out'}
            onPress={handleCheckOut}
            style={styles.checkBtn}
            isDisabled={disableCheckoutBtn}
          />
        </View>
        <CustomButton
          type={ButtonTypes.contained}
          text={'Submit'}
          onPress={attendanceSubmitHandler}
          style={styles.checkBtn}
          isDisabled={
            (checkinInfo || checkoutInfo) && !isSubmitted ? false : true
          }
        />
      </View>
      <SuccessFailureModal
        btnType="confirm"
        secondaryBtnTitle={'Dismiss'}
        title={isSubmitted ? 'Submitted' : 'Failure'}
        label={
          isSubmitted
            ? `You have successfully submitted ${
                checkinInfo ? 'Check-In' : ''
              } ${checkinInfo && checkoutInfo ? '& Check-Out ' : ''}details.`
            : 'Check-in / Checkout failed'
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
