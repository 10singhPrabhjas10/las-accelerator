import {FlatList, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-paper-dates';
import moment from 'moment';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import Layout from 'components/Layout';

import PencilIcon from '../../../../../../assets/icons/pencil.svg';
import AddNewIcon from '../../../../../../assets/icons/addNew.svg';
import EmptyBeatIcon from '../../../../../../assets/icons/emptyBeat.svg';
import ModifyPencilIcon from '../../../../../../assets/icons/modifyPencil.svg';

import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import BeatCard from 'screens/beat/components/beatCard/BeatCard';
import {RootNavigationProp} from 'routes/RootNavigation';
import styles from './AddBeat.style';
import {convertDateToDisplay, formatDate} from 'utils/commonMethods';
import CommonStyles from 'utils/commonStyle';
import {DateFormats} from 'constants/dateFormat';
import {getBeatPlanDetailsData, getBeatPlanItemData} from '../../Beat.business';
import {IBeatPlanIdData, IBeatPlanItemData} from 'screens/beat/Beat.interface';

const AddBeatscreen = () => {
  //For single select dates
  const [selectedDate, setSelectedDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState<number>(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [modifyButton, setModifyButton] = useState(false);
  const [beatPlan, setBeatPlan] = useState<IBeatPlanIdData[]>([]);
  const [beatPlanData, setBeatPlanData] = useState<IBeatPlanItemData[]>([]);

  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const pageSize = 10;

  const currentDate = moment();
  const todayDate = currentDate.format(DateFormats.DDD_MMM_D);

  const navigation = useNavigation<RootNavigationProp>();

  //for Calendar range
  const validRangeStart = moment().startOf('month').toDate();
  const validRangeEnd = moment().add(1, 'months').endOf('month').toDate();

  //handle single date selectionn
  const handleDaySinglePress = (day: any) => {
    setSelectedDate(day?.date);
    setMonth(new Date(day?.date).toLocaleString('default', {month: 'short'}));
    setYear(new Date(day?.date).getFullYear());
    setTotalPages(1);
    setPageNumber(1);
    setBeatPlanData([]);
  };

  useEffect(() => {
    if (selectedDate !== '') {
      const today = new Date();
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      const selectedDateObject = new Date(selectedDate);

      const isNextMonth =
        selectedDateObject.getMonth() === nextMonth.getMonth();

      let isDisabled = true;
      let isModify = true;

      if (isNextMonth) {
        if (
          beatPlan[0]?.status === 'Draft' ||
          beatPlan[0]?.status === 'Rejected'
        ) {
          isDisabled = false;
        }
      }
      setIsButtonDisabled(isDisabled);
      setModifyButton(isModify);
    }
  }, [selectedDate, beatPlanData, beatPlan]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, month, year]);

  const fetchBeatPlanData = async () => {
    if (pageNumber <= totalPages) {
      await getBeatPlanItemData(
        convertDateToDisplay(selectedDate, DateFormats.YYYY_MM_DD),
        pageNumber,
        pageSize,
        setBeatPlanData,
        setTotalPages,
      );
    }
  };

  useEffect(() => {
    if (selectedDate !== '') {
      fetchBeatPlanData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, selectedDate]);

  const openCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const renderPlanCard = ({item}: {item: IBeatPlanItemData}) => {
    return (
      <BeatCard
        title={item?.title ?? ''}
        subTitle={item?.subTitle ?? ''}
        address={item?.address ?? ''}
        mobileNumber={item?.mobileNumber}
        geoLocation={item?.geoLocation ?? ''}
        latitude={item?.latitude}
        longitude={item?.longitude}
      />
    );
  };

  return (
    <Layout style={CommonStyles.padding} headerTitle="Beat Plan">
      <View style={styles.dateComponent}>
        <Text style={styles.dateText} variant="headlineSmall">
          {selectedDate
            ? convertDateToDisplay(selectedDate, DateFormats.DDD_MMM_D)
            : todayDate}
        </Text>
        <TouchableOpacity onPress={openCalendar}>
          <PencilIcon width={40} height={40} style={styles.pencilIcon} />
        </TouchableOpacity>
      </View>
      {showCalendar && (
        <View style={styles.calendarView}>
          <Calendar
            mode="single"
            date={selectedDate ? new Date(selectedDate) : new Date()}
            onChange={handleDaySinglePress}
            locale="en"
            validRange={{startDate: validRangeStart, endDate: validRangeEnd}}
          />
        </View>
      )}

      {beatPlanData?.length > 0 && (
        <View style={styles.header}>
          <Text style={styles.titleText} variant="titleMedium">
            Beat Plan for the Day
          </Text>
          {modifyButton && (
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('ModifyBeat', {
                  data: beatPlanData,
                  date: formatDate(selectedDate),
                  beatPlanId: beatPlan[0]?.beatplanId,
                  status: beatPlan[0]?.status,
                  name: beatPlan[0]?.name,
                })
              }
              style={styles.modifyView}>
              <ModifyPencilIcon />
              <Text style={styles.modifyText} variant="bodyMedium">
                Modify
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {beatPlanData?.length < 0 && (
        <EmptyContainer
          title="You don’t have any beat plan for the day"
          icon={<EmptyBeatIcon width={71} height={92} />}
        />
      )}
      <FlatList
        data={beatPlanData}
        style={styles.flatlistStyle}
        renderItem={renderPlanCard}
        showsVerticalScrollIndicator={false}
        scrollEnabled
        initialNumToRender={10}
        onEndReached={() => {
          if (onEndReached) {
            setPageNumber(prev => prev + 1);
            setOnEndReached(true);
          }
        }}
        onMomentumScrollBegin={() => setOnEndReached(true)}
        onMomentumScrollEnd={() => setOnEndReached(false)}
        onEndReachedThreshold={0.5}
      />
      <View style={CommonStyles.flexOne} />
      <CustomButton
        type={ButtonTypes.contained}
        text="Add New Beat Plan"
        onPress={() =>
          navigation?.navigate('AddNewStore', {
            navigationFrom: 'beatPlan',
            date: formatDate(selectedDate),
            beatPlanId: beatPlan[0]?.beatplanId,
            status: beatPlan[0]?.status,
            name: beatPlan[0]?.name,
          })
        }
        isDisabled={isButtonDisabled}
        icon={<AddNewIcon />}
      />
    </Layout>
  );
};

export default AddBeatscreen;
