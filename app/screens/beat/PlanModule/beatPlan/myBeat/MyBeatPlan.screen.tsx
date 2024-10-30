import {FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import styles from './MyBeatPlan.style';
import {Calendar} from 'react-native-paper-dates';
import moment from 'moment';

import Pencil from '../../../../../../assets/icons/pencil.svg';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import ModalComponent from 'modals/ModalComponent';
import BeatPlanModal from './BeatPlanModal';

import {InformationCard} from 'components/infoCard/InformationCard';
import {SnackBarEnum} from 'constants/modalTypes';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import BeatCard from 'screens/beat/components/beatCard/BeatCard';
import {DateFormats} from 'constants/dateFormat';
import {convertDateToDisplay} from 'utils/commonMethods';
import {
  createBeatPlanDeviation,
  getBeatPlanItemData,
  getBeatPreConditionsData,
  getMyBeatPlanDetails,
} from '../../Beat.business';
import {
  IBeatPlanIdData,
  IBeatPlanItemData,
  IBeatPreConditionsData,
  IRecurrenceData,
  Status,
} from 'screens/beat/Beat.interface';
import {TouchableOpacity} from 'react-native';

import ListCardComponent from '../../../components/listCardComponent/listCardComponent';
import MapCardComponent from '../../../components/mapCardComponent/mapCardComponent';
import { beatListCardData } from '@/utils/dummyData';

const MyBeatPlanScreen = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [dateShow, setDateToShow] = useState('');

  const [beatPlan, setBeatPlan] = useState<IBeatPlanIdData[]>([]);
  const [beatPreConditions, setBeatPreConditions] = useState<
    IBeatPreConditionsData[]
  >([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState<number>(0);

  const [beatPlanData, setBeatPlanData] = useState<IBeatPlanItemData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const pageSize = 10;

  const currentDate = moment();
  const todayDate = currentDate.format(DateFormats.DDD_MMM_D);

  //for Calendar range
  const validRangeStart = moment().startOf('month').toDate();
  const validRangeEnd = moment().add(1, 'months').endOf('month').toDate();

  //calculate first and last date of month
  const getStartEndDateOfMonth = (dateString: string) => {
    const selectedDate = new Date(dateString);

    const startDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    );
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0,
    );
    endDate.setHours(23, 59, 59, 999);

    return {
      startDateMonth: convertDateToDisplay(
        startDate?.toISOString(),
        DateFormats.YYYY_MM_DD,
      ),
      endDateMonth: convertDateToDisplay(
        endDate?.toISOString(),
        DateFormats.YYYY_MM_DD,
      ),
    };
  };

  useEffect(() => {
    if (dateShow !== '') {
      const today = new Date();
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      const selectedDateObject = new Date(dateShow);

      const isNextMonth =
        selectedDateObject.getMonth() === nextMonth.getMonth();
      let isDisabled = true; //beatPlan?.length > 0;

      if (isNextMonth) {
        if (
          beatPlan.length &&
          (beatPlan[0]?.status === 'Sent for approval' ||
            beatPlan[0]?.status === 'Approved')
        ) {
          // If next month and beat plan status is "Sent for approval" or "Approved", disable button
          isDisabled = true;
        } else {
          // If next month and beat plan status is not "Sent for approval" or "Approved", enable button
          isDisabled = false;
        }
      } else {
        // If not next month, disable button
        isDisabled = true;
      }
      setIsButtonDisabled(isDisabled);
    }
  }, [dateShow, beatPlan]);

  const handleDaySinglePress = (day: any) => {
    setDateToShow(day?.datePressed);
    setMonth(
      new Date(day?.datePressed).toLocaleString('default', {month: 'short'}),
    );
    setYear(new Date(day?.datePressed).getFullYear());
    setTotalPages(1);
    setPageNumber(1);
    setBeatPlanData([]);
  };

  const fetchBeatPlanDetails = () => {
    if (dateShow !== '') {
      if (month !== beatPlan[0]?.month || String(year) !== beatPlan[0]?.year) {
        getMyBeatPlanDetails(month, year, setBeatPlan);
      }
    }
  };

  useEffect(() => {
    fetchBeatPlanDetails();
  }, [dateShow, month, year]);

  const fetchBeatPlanData = async () => {
    if (pageNumber <= totalPages) {
      await getBeatPlanItemData(
        convertDateToDisplay(dateShow, DateFormats.YYYY_MM_DD),
        pageNumber,
        pageSize,
        setBeatPlanData,
        setTotalPages,
      );
    }
  };

  useEffect(() => {
    if (dateShow !== '') {
      fetchBeatPlanData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, dateShow]);

  const getBeatPreConditions = () => {
    getBeatPreConditionsData(
      getStartEndDateOfMonth(dateShow).startDateMonth,
      getStartEndDateOfMonth(dateShow).endDateMonth,
      beatPlan?.[0]?.beatplanId,
      setBeatPreConditions,
      () => setShowSuccessModal(true),
      setBeatPlan,
    );
  };

  useEffect(() => {
    if (beatPreConditions?.length > 0) {
      setShowModal(true);
    }
  }, [beatPreConditions]);

  const handleSubmitData = (dataArray: IRecurrenceData[]) => {
    const requestBody = {
      data: dataArray,
    };
    setShowModal(false);
    setIsButtonDisabled(true);
    createBeatPlanDeviation(
      requestBody,
      beatPlan?.[0]?.beatplanId,
      setBeatPlan,
      () => {
        setShowSuccessModal(true);
        setShowInfoCard(true);

        setBeatPreConditions([]);
      },
    );
  };

  const renderPlanCard = ({item}: {item: IBeatPlanItemData}) => {
    return (
      <BeatCard
        title={item?.title ?? ''}
        subTitle={item?.subTitle ?? ''}
        address={item?.address ?? ''}
        geoLocation={item.geoLocation ?? ''}
        mobileNumber={item.mobileNumber}
        latitude={item?.latitude}
        longitude={item?.longitude}
      />
    );
  };

  const getStatusMessage = (status: string, comment?: string) => {
    switch (status) {
      case Status.DRAFT:
        return '';
      case Status.SENT_FOR_APPROVAL:
        return 'You Beat Plan has been sent for Approval!';
      case Status.APPROVED:
        return 'Your Beat plan has been successfully approved by SE- PIC.';
      case Status.REJECTED:
        return !!comment
          ? `Your Beat Plan has been rejected ${comment}`
          : 'Your Beat Plan has been rejected';
      default:
        return '';
    }
  };

  const sortedData = [... beatListCardData.data].sort((a, b) => a.priority - b.priority);

  return (
    <Layout headerTitle="Beat Plan">
      <View style={styles.container}>
        <View style={styles.dateHeader}>
          <Text style={styles.dateText} variant="headlineSmall">
            {dateShow
              ? moment(dateShow).format(DateFormats.DDD_MMM_D)
              : todayDate}
          </Text>
          <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
            <Pencil width={40} height={40} style={styles.pencilIcon} />
          </TouchableOpacity>
        </View>

        {/* ListCardComponent */}
        <View>
          <FlatList
            data={beatListCardData.data}
            renderItem={({item}) => (
              <ListCardComponent 
                image={item.image}
                name={item.name}
                address={item.address}
                distance={item.distance}
                time={item.time}
              />
            )}
            keyExtractor={(item) => item.name}
          />
        </View>

        {/* MapCardComponent */}
        <View>
          <FlatList
            data={sortedData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <MapCardComponent 
                count = {index + 1}
                name={item.name}
                address={item.address}
                distance={item.distance}
                time={item.time}
              />
            )}
            keyExtractor={(item) => item.name}
          />
        </View>

        {showCalendar && (
          <View style={styles.calendar}>
            <Calendar
              mode="multiple"
              date={dateShow ? new Date(dateShow) : new Date()}
              onChange={day => handleDaySinglePress(day)}
              locale="en"
              validRange={{startDate: validRangeStart, endDate: validRangeEnd}}
              dates={
                beatPreConditions?.length !== 0
                  ? beatPreConditions
                      ?.filter(item => item?.date !== null)
                      .map(item => new Date(item?.date))
                  : dateShow
                  ? [new Date(dateShow)]
                  : [new Date()]
              }
            />
          </View>
        )}

        {beatPlan?.[0]?.status && beatPlan?.[0]?.status !== Status.DRAFT && (
          <View style={styles.infoCardView}>
            <InformationCard
              type={SnackBarEnum.INFO}
              description={getStatusMessage(
                beatPlan?.[0]?.status,
                beatPlan?.[0]?.comment,
              )}
            />
          </View>
        )}

        <FlatList
          style={styles.flatlist}
          data={beatPlanData}
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
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        text="Submit"
        onPress={() => {
          getBeatPreConditions();
        }}
        isDisabled={isButtonDisabled}
        style={styles.saveButton}
      />
      <ModalComponent
        showModal={showModal}
        setShowModal={() => setShowModal(!showModal)}>
        <BeatPlanModal
          setShowModal={setShowModal}
          setShowSuccessModal={setShowSuccessModal}
          month={month}
          year={year}
          beatPreConditions={beatPreConditions}
          beatPlanId={beatPlan?.[0]?.beatplanId}
          onSubmitData={handleSubmitData}
        />
      </ModalComponent>
      <SuccessFailureModal
        btnType="confirm"
        secondaryBtnTitle={'Dismiss'}
        title={'Submitted'}
        label={`You have successfully submitted your Beat Plan for ${month} ${year}`}
        onSecondaryBtnHandler={() => {
          fetchBeatPlanDetails();
          setShowSuccessModal(false);
        }}
        setShowModal={() => setShowSuccessModal(false)}
        showModal={showSuccessModal}
        isSuccess
      />
    </Layout>
  );
};
export default MyBeatPlanScreen;
