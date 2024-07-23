import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import {TabScreen, Tabs, TabsProvider} from 'react-native-paper-tabs';
import {COLORS} from 'theme/colors';
import styles from './StoreTab.style';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';

import AddNew from '../../../../../assets/icons/addNew.svg';
import StoreCard from '../components/storeCard/StoreCard';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {convertDateToDisplay, formatDate} from 'utils/commonMethods';
import CommonStyles from 'utils/commonStyle';
import {IStoreBeatPlanItem, StoreTab} from '../StoreCheckIn.interface';
import {DateFormats} from 'constants/dateFormat';
import {
  createCheckInTime,
  getStoreBeatPlanItemData,
} from '../StoreCheckIn.business';
import {useDispatch} from 'react-redux';
import {clearChannelPartner} from 'store/redux/channelPartnerSlice';

const StoreTabScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<RootNavigationTypes, 'StoreTab'>>();
  const {date, beatPlanId, status, name, location} = route.params;
  const [selectedTab, setSelectedTab] = useState(StoreTab.SCHEDULE);

  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const [beatPlanData, setBeatPlanData] = useState<IStoreBeatPlanItem[]>([]);
  const pageSize = 10;

  const fetchStoreBeatPlanData = useCallback(
    async (selectedTabData: StoreTab) => {
      let filters = '';
      const formattedDate = convertDateToDisplay(date, DateFormats.YYYY_MM_DD);

      if (selectedTabData === StoreTab.PENDING) {
        filters = `filters[date]=${formattedDate}&filters[checkInDate][$null]=true&page=${pageNumber}&pageSize=${pageSize}&sort[createdAt]=asc`;
      } else if (selectedTabData === StoreTab.COMPLETED) {
        filters = `filters[date]=${formattedDate}&filters[checkInDate][$null]=false&page=${pageNumber}&pageSize=${pageSize}&sort[createdAt]=asc`;
      } else if (selectedTabData === StoreTab.SCHEDULE) {
        filters =
          filters = `filters[date]=${formattedDate}&page=${pageNumber}&pageSize=${pageSize}&sort[createdAt]=asc`;
      } else {
        filters = `filters[date]=${formattedDate}&page=${pageNumber}&pageSize=${pageSize}&sort[createdAt]=asc&isOrderDetail=true`;
      }

      if (pageNumber <= totalPages) {
        await getStoreBeatPlanItemData(setBeatPlanData, setTotalPages, filters);
      }
    },
    [pageNumber],
  );

  useEffect(() => {
    if (date !== '' && selectedTab) {
      fetchStoreBeatPlanData(selectedTab);
    }
  }, [pageNumber, pageSize, selectedTab]);

  useEffect(() => {
    dispatch(clearChannelPartner());
  }, []);

  const handleRefreshData = () => {
    fetchStoreBeatPlanData(selectedTab);
    setPageNumber(1);
    setTotalPages(1);
    setBeatPlanData([]);
    dispatch(clearChannelPartner());
  };

  const handleChangeIndex = (data: StoreTab) => {
    setSelectedTab(data);
    setBeatPlanData([]);
    setPageNumber(1);
    setTotalPages(1);
    dispatch(clearChannelPartner());
  };

  const handleCheckIn = (item: IStoreBeatPlanItem) => {
    if (
      item?.relation === 'Activity' &&
      item?.activity?.activity === 'Influencer meet'
    ) {
      navigation?.navigate('InfluencerMeet', {
        beatPlanItemId: item?.beatplanItemId,
        date,
      });
    } else if (
      item?.relation === 'Activity' &&
      ['Training', 'Branch visit']?.includes(item?.activity?.activity ?? '')
    ) {
      navigation?.navigate('Training', {
        navigationFrom: item?.activity?.activity ?? '',
        date,
        beatPlanItemId: item?.beatplanItemId,
      });
    } else {
      navigation?.navigate('CheckIn', {
        item,
        date,
        refreshData: handleRefreshData,
      });
    }
  };

  const onCheckInPress = (beatItem: IStoreBeatPlanItem) => {
    const requestBody = {
      checkInDate: date,
      userLatitude: location?.coords?.latitude,
      userLongitude: location?.coords?.longitude,
    };
    if (location && beatItem?.checkInDate === null) {
      createCheckInTime(
        beatItem?.beatplanItemId,
        beatPlanData,
        requestBody,
        setBeatPlanData,
        () => {
          handleCheckIn(beatItem);
        },
      );
    }
  };

  const onEditPress = (beatItem: IStoreBeatPlanItem) => {
    handleCheckIn(beatItem);
  };

  return (
    <Layout headerTitle="Store Check-In">
      <View style={CommonStyles.flexOne}>
        <TabsProvider>
          <Tabs
            showLeadingSpace={false}
            style={styles.tabs}
            mode="scrollable"
            theme={{colors: {surface: COLORS.white}}}
            disableSwipe>
            <TabScreen
              onPress={() => handleChangeIndex(StoreTab.SCHEDULE)}
              label={StoreTab.SCHEDULE}>
              <StoreCard
                onEditPress={onEditPress}
                data={beatPlanData}
                date={date}
                screenName={StoreTab.SCHEDULE}
                checkIn
                setOnEndReached={setOnEndReached}
                setPageNumber={setPageNumber}
                onEndReached={onEndReached}
                onCheckInPress={onCheckInPress}
              />
            </TabScreen>
            <TabScreen
              onPress={() => handleChangeIndex(StoreTab.PENDING)}
              label={StoreTab.PENDING}>
              <StoreCard
                onEditPress={onEditPress}
                data={beatPlanData}
                date={date}
                screenName={StoreTab.PENDING}
                checkIn
                setOnEndReached={setOnEndReached}
                setPageNumber={setPageNumber}
                onEndReached={onEndReached}
                onCheckInPress={onCheckInPress}
              />
            </TabScreen>
            <TabScreen
              onPress={() => handleChangeIndex(StoreTab.COMPLETED)}
              label={StoreTab.COMPLETED}>
              <StoreCard
                onEditPress={onEditPress}
                data={beatPlanData}
                date={date}
                screenName={StoreTab.COMPLETED}
                checkIn
                setOnEndReached={setOnEndReached}
                setPageNumber={setPageNumber}
                onEndReached={onEndReached}
                onCheckInPress={onCheckInPress}
              />
            </TabScreen>
            <TabScreen
              onPress={() => handleChangeIndex(StoreTab.ORDER_DETAILS)}
              label={StoreTab.ORDER_DETAILS}>
              <StoreCard
                onEditPress={onEditPress}
                data={beatPlanData}
                date={date}
                screenName={StoreTab.ORDER_DETAILS}
                orderCard={true}
                setOnEndReached={setOnEndReached}
                setPageNumber={setPageNumber}
                onEndReached={onEndReached}
                onCheckInPress={onCheckInPress}
              />
            </TabScreen>
          </Tabs>
        </TabsProvider>
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        text="Add New Store"
        onPress={() => {
          navigation?.navigate('AddNewStore', {
            navigationFrom: 'storeCheckIn',
            date: formatDate(date),
            beatPlanId,
            name,
            status,
            refreshData: handleRefreshData,
          });
        }}
        icon={<AddNew />}
        style={styles.button}
      />
    </Layout>
  );
};

export default StoreTabScreen;
