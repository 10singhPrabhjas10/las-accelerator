import {View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import {Tabs, TabScreen, TabsProvider} from 'react-native-paper-tabs';
import {COLORS} from 'theme/colors';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import FilterButton from 'components/button/FilterButton';

import styles from './TicketHistory.style';
import EmptyIcon from '../../../../../../../assets/icons/empty.svg';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import CommonStyles from 'utils/commonStyle';

import moment from 'moment';
import {DateFormats} from 'constants/dateFormat';
import DataCard from 'components/dataCard/DataCard';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {ITicketFilterData} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import TicketFilter from '../ticketFilter/TicketFilter';
import {
  ITicketHistoryReqBody,
  ITicketHistoryResponse,
  TICKET,
} from '../../CheckIn.interface';
import {convertDateToDisplay} from 'utils/commonMethods';
import {getTicketHistoryData} from '../../CheckIn.business';
import {EMPTY_DATA_DASH, NavigationFrom} from 'utils/Constants';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';

const TicketHistory = () => {
  const route = useRoute<RouteProp<RootNavigationTypes, 'TicketHistory'>>();
  const {navigationFrom} = route.params;

  const secondaryCustomerId = useSelector(
    (state: RootState) => state?.channelPartner?.retailerCustomerCode,
  );

  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );

  const code =
    navigationFrom === NavigationFrom.STORE_CHECKIN
      ? relationId
      : secondaryCustomerId;
  const currentDate = moment();

  // Calculate the start date for the last month (18th of the previous month)
  const startDate = currentDate.clone().subtract(1, 'month');

  // Calculate the end date (31 days after the start date)
  const endDate = startDate.clone().add(31, 'days');

  // Format the dates
  const formattedStartDate = startDate.format(DateFormats.YYYY_MM_DD);
  const formattedEndDate = endDate.format(DateFormats.YYYY_MM_DD);

  const [ticketData, setTicketData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const [pageType, setPageType] = useState<TICKET>(TICKET.OPEN_TICKET);
  const [isFilterApplied, setIsFilterApplied] = useState(true);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [filterData, setFilterData] = useState<ITicketFilterData>({
    requestFilter: [],
    statusFilter: [],
    dateFilter: [],
    dropdownType: '',
  });

  const getTicketData = useCallback(
    (pageTypeFilter: TICKET, appliedFilters: ITicketFilterData) => {
      const reqBody: ITicketHistoryReqBody = {
        pagination: {
          page: pageNumber,
          pageSize: 10,
        },
        filters: {
          type: pageTypeFilter,
          contentType: appliedFilters.requestFilter,
          ticketStatus: appliedFilters.statusFilter,
          customDate: {
            fromDate: appliedFilters.dateFilter[0]
              ? convertDateToDisplay(
                  appliedFilters?.dateFilter[0],
                  DateFormats.YYYY_MM_DD,
                )
              : formattedStartDate,
            toDate: appliedFilters?.dateFilter[1]
              ? convertDateToDisplay(
                  appliedFilters?.dateFilter[1],
                  DateFormats.YYYY_MM_DD,
                )
              : formattedEndDate,
          },
        },
      };
      getTicketHistoryData(code, reqBody, setTicketData, setTotalPages);
      setIsFilterApplied(false);
    },
    [pageNumber, pageType],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      getTicketData(pageType, filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageType, isFilterApplied]);

  const handleChangeIndex = (data: TICKET) => {
    setPageType(data);
    setTicketData([]);
    setPageNumber(1);
    setIsFilterApplied(true);
  };

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsFilterApplied(true);
    setTicketData([]);
    setPageNumber(1);
  };

  const renderItem = ({item}: {item: ITicketHistoryResponse}) => {
    return (
      <DataCard
        data={[
          {
            title: 'Status',
            text: item.ticketStatus ?? EMPTY_DATA_DASH,
          },
          {
            title: 'Ticket ID',
            text: item.ticketId ?? EMPTY_DATA_DASH,
          },
          {
            title: 'Type',
            text: item.supportType ?? EMPTY_DATA_DASH,
          },
          {
            title: 'Sub-Type',
            text: item.supportSubType ?? EMPTY_DATA_DASH,
          },
          {
            title: 'Remarks',
            text: item?.remarks ?? EMPTY_DATA_DASH,
          },
          {
            title: 'Product Category',
            text: item.productCategory ?? EMPTY_DATA_DASH,
          },
        ]}
        key={item.id}
        isExpandableButtonVisible={false}
        rows={6}
        header={convertDateToDisplay(
          item?.ticketCreationDate,
          DateFormats.DD_MMM_YY_2,
        )}
      />
    );
  };

  const emptyContainer = (tab: string) => {
    return (
      <EmptyContainer
        title={
          tab === 'openTab'
            ? 'You do not have Open Tickets'
            : 'You have not raised any tickets'
        }
        icon={<EmptyIcon width={110} height={110} color={COLORS.lightblue} />}
      />
    );
  };

  const ticketScreen = (tempData: ITicketHistoryResponse[], tab: string) => {
    return (
      <FlatList
        data={tempData}
        style={CommonStyles.flexOne}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        initialNumToRender={10}
        onEndReached={() => {
          if (!onEndReached) {
            setPageNumber(prev => prev + 1);
            setOnEndReached(true);
            setIsFilterApplied(true);
          }
        }}
        onMomentumScrollBegin={() => setOnEndReached(false)}
        onEndReachedThreshold={0.7}
        ListEmptyComponent={emptyContainer(tab)}
      />
    );
  };

  return (
    <Layout headerTitle="Ticket History">
      <View style={CommonStyles.flexOne}>
        <TabsProvider>
          <Tabs theme={{colors: {surface: COLORS.white}}} disableSwipe>
            <TabScreen
              label="Open Tickets"
              onPress={() => handleChangeIndex(TICKET.OPEN_TICKET)}>
              {ticketScreen(ticketData, 'openTab')}
            </TabScreen>
            <TabScreen
              label="Closed Tickets"
              onPress={() => handleChangeIndex(TICKET.CLOSED_TICKET)}>
              {ticketScreen(ticketData, 'closeTab')}
            </TabScreen>
          </Tabs>
        </TabsProvider>
      </View>
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'75%'}
        minHeight={'75%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <TicketFilter
          onApplyFilter={handleApplyFilters}
          filterData={filterData}
          setFilterData={setFilterData}
          relationId={code}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default TicketHistory;
