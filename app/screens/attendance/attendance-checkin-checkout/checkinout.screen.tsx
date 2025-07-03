import Layout from 'components/Layout';
import React, {useCallback, useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import {CalendarUtils} from 'react-native-calendars';
import {COLORS} from 'theme/colors';
import {FlatList, Modal, Pressable, Text} from 'react-native';
import {View} from 'react-native';
import {styles} from './checkinout.styles';
import moment from 'moment';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import Spacer from 'components/spacer';
import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {useNavigation} from '@react-navigation/native';
import CommonCalendar from '../../../components/calendar/CommonCalendar';
type DayInfo = {
  date?: string;
  time?: string;
  location?: string;
  isCheckIn?: boolean;
};

export const CheckInCheckOutScreen = () => {
  const navigation = useNavigation();

  const [checkinInfo, setCheckIn] = useState<DayInfo | undefined>();
  const [checkoutInfo, setCheckOut] = useState<DayInfo | undefined>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const attendanceData = [
    {date: '2025-07-05', type: 'present'},
    {date: '2025-07-02', type: 'present'},
    {date: '2025-07-03', type: 'present'},
    {date: '2025-07-04', type: 'present'},
    {date: '2025-07-25', type: 'present'},
    //absent
    {date: '2025-07-09', type: 'absent'},
    {date: '2025-07-10', type: 'absent'},
    {date: '2025-07-11', type: 'absent'},
    //holiday
    {date: '2025-07-23', type: 'holiday'},
    {date: '2025-07-24', type: 'holiday'},
    //pending
    {date: '2025-07-17', type: 'pending'},
    {date: '2025-07-18', type: 'pending'},
  ];

  const TYPE_COLORS = {
    present: COLORS.lightGreen,
    absent: COLORS.lightRed,
    pending: COLORS.lightOrange,
    holiday: COLORS.lightBlue,
    weekoff: COLORS.gray,
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

      setShowSuccessModal(true);
      setIsSubmitted(true);
    } catch (error) {
      //setIsSubmitted(false);
      //setShowSuccessModal(true);
    }
  };
  const markedDates = attendanceData.reduce<Record<string, any>>(
    (acc, item) => {
      acc[item.date] = {
        customStyles: {
          container: {
            backgroundColor: TYPE_COLORS[item.type as keyof typeof TYPE_COLORS],
            borderRadius: 20,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          },
          text: {
            color: '#222',
            fontWeight: 'bold',
            fontSize: 16,
          },
        },
      };
      return acc;
    },
    {},
  );
  const today = CalendarUtils.getCalendarDateString(new Date());
  if (!markedDates[today]) {
    markedDates[today] = {
      customStyles: {
        container: {
          backgroundColor: '#e0e0e0',
          borderRadius: 20,
          width: 36,
          height: 36,
          alignItems: 'center',
          justifyContent: 'center',
        },
        text: {
          color: '#222',
          fontWeight: 'bold',
          fontSize: 16,
        },
      },
      selected: true,
    };
  }
  const monthsList = Array.from({length: 12}, (_, i) =>
    moment().month(i).format('MMMM'),
  );
  const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);

  const handleMonthSelect = (index: number) => {
    const newDate = new Date(selectedValue);
    newDate.setMonth(index);
    setSelectedValue(newDate);
    setMonthPickerVisible(false);
  };

  return (
    <Layout
      headerTitle={'Check-in & Check-Out'}
      style={[CommonStyles.padding16, styles.root]}
      isScrollable={true}>
      <CommonCalendar
        markedDates={markedDates}
        selectedValue={selectedValue}
        onMonthChange={setSelectedValue}
      />
      <Modal
        visible={isMonthPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMonthPickerVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month</Text>
            <FlatList
              data={monthsList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <Pressable
                  style={styles.monthItem}
                  onPress={() => handleMonthSelect(index)}>
                  <Text style={styles.monthItemText}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.summaryRow}></View>
      <View style={styles.daysInfoWrap}>
        <View style={[styles.infoWrap, styles.rightBorder]}>
          <Text style={[styles.numberInfo, styles.present]}>5</Text>
          <Text style={styles.numberTypeInfo}>{'Present'}</Text>
        </View>
        <View style={[styles.infoWrap, styles.rightBorder]}>
          <Text style={[styles.numberInfo, styles.pending]}>2</Text>
          <Text style={styles.numberTypeInfo}>{'Pending'}</Text>
        </View>
        <View style={styles.infoWrap}>
          <Text style={[styles.numberInfo, styles.holiday]}>3</Text>
          <Text style={styles.numberTypeInfo}>Absent</Text>
        </View>
        <View style={styles.infoWrap}>
          <Text style={[styles.numberInfo, styles.holiday]}>0</Text>
          <Text style={styles.numberTypeInfo}>Week-Off</Text>
        </View>

        <View style={styles.infoWrap}>
          <Text style={[styles.numberInfo, styles.holiday]}>2</Text>
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
            onPress={() => {
              handleCheckIn();
            }}
            style={[
              styles.checkBtn,
              {
                borderColor:
                  disableCheckInBtn === true ? COLORS.lightGrey : COLORS.dgreen,
              },
            ]}
            isDisabled={disableCheckInBtn}
            textStyle={{color: COLORS.dgreen}}
          />
          <CustomButton
            type={ButtonTypes.outline}
            text={'Check-Out'}
            onPress={() => {
              handleCheckOut();
            }}
            style={[
              styles.checkBtn,
              {
                borderColor:
                  disableCheckoutBtn === true
                    ? COLORS.lightGrey
                    : COLORS.dgreen,
              },
            ]}
            isDisabled={disableCheckoutBtn}
            textStyle={{color: COLORS.dgreen}}
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
            navigation.navigate(
              'AttendanceManagement' as never,
              {selectedCard: 'regularisation'} as never,
            );
          }
        }}
        setShowModal={() => setShowSuccessModal(false)}
        showModal={showSuccessModal}
        isSuccess={isSubmitted}
      />
    </Layout>
  );
};
