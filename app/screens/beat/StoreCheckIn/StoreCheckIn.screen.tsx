import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import {Calendar} from 'react-native-paper-dates';
import moment from 'moment';

import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {DateFormats} from 'constants/dateFormat';

import styles from './StoreCheckIn.style';

import PencilIcon from '../../../../assets/icons/pencil.svg';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {useNavigation} from '@react-navigation/core';
import {RootNavigationProp} from 'routes/RootNavigation';
import {IBeatPlanIdData} from './StoreCheckIn.interface';
import {hasLocationPermission} from 'utils/commonMethods';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {getBeatPlanDetailsData} from './StoreCheckIn.business';

const initialState = {
  mocked: false,
  timestamp: 0,
  extras: {
    meanCn0: 0,
    maxCn0: 0,
    satellites: 0,
  },
  coords: {
    speed: 0,
    heading: 0,
    altitude: 0,
    accuracy: 0,
    longitude: 0,
    latitude: 0,
    altitudeAccuracy: 0,
  },
};

const StoreCheckInScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState<number>(0);

  const [beatPlan, setBeatPlan] = useState<IBeatPlanIdData[]>([]);
  const [location, setLocation] = useState<GeolocationResponse>(initialState);

  const currentDate = moment();
  const todayDate = currentDate.format(DateFormats.DDD_MMM_D);

  const startDate = moment().startOf('month').toDate();
  const endDate = moment().endOf('month').toDate();

  //handle single date selectionn
  const handleDaySinglePress = (day: any) => {
    setSelectedDate(day?.date);
    setMonth(new Date(day?.date).toLocaleString('default', {month: 'short'}));
    setYear(new Date(day?.date).getFullYear());
  };

  const getLocation = async () => {
    try {
      const hasPermission = await hasLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          pos => {
            setLocation(pos);
          },
          error => console.log('err', error),
          {enableHighAccuracy: true},
        );
      } else {
        throw new Error('Location permission not granted');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const fetchBeatPlanDetails = () => {
    if (selectedDate !== '') {
      if (month !== beatPlan[0]?.month || String(year) !== beatPlan[0]?.year) {
        const name = `Beat for ${month} ${year}`;
        getBeatPlanDetailsData(month, year, name, setBeatPlan);
      }
    }
  };

  useEffect(() => {
    fetchBeatPlanDetails();
  }, [selectedDate, month, year]);

  return (
    <Layout style={CommonStyles.padding} headerTitle="Store Check-In">
      <View style={CommonStyles.flexOne}>
        <View style={styles.dateComponent}>
          <Text style={styles.dateText} variant="headlineSmall">
            {selectedDate
              ? moment(selectedDate).format(DateFormats.DDD_MMM_D)
              : todayDate}
          </Text>
          <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
            <PencilIcon width={40} height={40} style={styles.pencilIcon} />
          </TouchableOpacity>
        </View>
        {showCalendar && (
          <View style={styles.calendar}>
            <Calendar
              mode="single"
              date={selectedDate ? new Date(selectedDate) : new Date()}
              onChange={handleDaySinglePress}
              locale="en"
              validRange={{startDate: startDate, endDate: endDate}}
            />
          </View>
        )}
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        text="Proceed"
        onPress={() =>
          navigation.navigate('StoreTab', {
            date: selectedDate,
            beatPlanId: beatPlan[0]?.beatplanId,
            status: beatPlan[0]?.status,
            name: beatPlan[0]?.name,
            location,
          })
        }
        isDisabled={selectedDate === ''}
      />
    </Layout>
  );
};

export default StoreCheckInScreen;
