import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {TabScreen, Tabs, TabsProvider} from 'react-native-paper-tabs';

import Layout from 'components/Layout';
import FilterButton from 'components/button/FilterButton';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import OrderHistoryFilter from '../components/OrderHistoryFilter';

import CommonStyles from 'utils/commonStyle';
import {COLORS} from 'theme/colors';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {ID_ALL, PAGE_SIZE} from 'utils/Constants';
import {FlatList, View} from 'react-native';
import DataCard from 'components/dataCard/DataCard';
import {RootNavigationProp} from 'routes/RootNavigation';
import {useNavigation} from '@react-navigation/native';
import {getOrderHistoryListData} from '../OrderManagement.business';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const ORDER_TYPES = ['OPEN_ORDERS', 'CLOSED_ORDERS'];

const OrderHistory = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [orderHistoryData, setOrderHistoryData] = useState<
    IOrderHistoryListProps[]
  >([]);
  const [filterData, setFilterData] = useState<IOrderHistoryFilters>({
    orderStatus: [],
    categoryIds: [],
    customDate: {
      fromDate: '',
      toDate: '',
    },
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);

  const isLoading = useSelector((state: RootState) => state.modal.isLoading);
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );

  const handleChangeIndex = (index: number) => {
    setTabIndex(index);
    setOrderHistoryData([]);
    setIsFilterApplied(true);
    setPageNumber(1);
    setTotalPages(1);
  };

  const getOrderHistoryData = useCallback(
    (appliedFilters: IOrderHistoryFilters, selectedTabIndex: number) => {
      const requestBody = {
        channelPartnerId: customerCode,
        pagination: {
          page: pageNumber,
          pageSize: PAGE_SIZE.OrderHistory,
        },
        filters: {
          type: ORDER_TYPES[selectedTabIndex],
          orderStatus: [
            ...appliedFilters.orderStatus.filter(item => item !== ID_ALL),
          ],
          categoryIds: [
            ...appliedFilters.categoryIds.filter(item => item !== ID_ALL),
          ],
          customDate: appliedFilters.customDate,
        },
      };
      getOrderHistoryListData(requestBody, setOrderHistoryData, setTotalPages);
      setIsFilterApplied(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customerCode, pageNumber, tabIndex],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      getOrderHistoryData(filterData, tabIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex, pageNumber, isFilterApplied]);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setOrderHistoryData([]);
    setPageNumber(1);
    setIsFilterApplied(true);
  };

  const renderOrderHistoryList = () => {
    return (
      <FlatList
        data={orderHistoryData}
        renderItem={({item}) => (
          <DataCard
            key={item.orderNo}
            data={item.data}
            header={item.date}
            showViewDetailsButton
            onPressViewLeadDetails={() =>
              navigation.navigate('OrderHistoryDetails', {
                orderNo: item.orderCode,
              })
            }
          />
        )}
        style={CommonStyles.flexOne}
        contentContainerStyle={CommonStyles.margin}
        initialNumToRender={PAGE_SIZE.OrderHistory}
        onEndReached={() => {
          if (!onEndReached) {
            setPageNumber(prev => prev + 1);
            setOnEndReached(true);
            setIsFilterApplied(true);
          }
        }}
        onMomentumScrollBegin={() => setOnEndReached(false)}
        onEndReachedThreshold={0.7}
        ListEmptyComponent={emptyContainer()}
      />
    );
  };

  const emptyContainer = () =>
    isLoading ? null : (
      <View style={CommonStyles.flexOne}>
        <EmptyContainer
          title={`You do not have ${tabIndex === 0 ? 'Open' : 'Closed'} Orders`}
        />
      </View>
    );

  return (
    <Layout headerTitle="Order History">
      <TabsProvider>
        <Tabs disableSwipe theme={{colors: {surface: COLORS.white}}}>
          <TabScreen onPress={() => handleChangeIndex(0)} label="Open Orders">
            {renderOrderHistoryList()}
          </TabScreen>
          <TabScreen onPress={() => handleChangeIndex(1)} label="Closed Orders">
            {renderOrderHistoryList()}
          </TabScreen>
        </Tabs>
      </TabsProvider>
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'77%'}
        minHeight={'77%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <OrderHistoryFilter
          filterData={filterData}
          setFilterData={setFilterData}
          onApplyFilter={handleApplyFilters}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default OrderHistory;
