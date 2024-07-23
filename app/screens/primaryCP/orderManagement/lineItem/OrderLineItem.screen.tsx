import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import CommonStyles from 'utils/commonStyle';
import {RouteProp, useRoute} from '@react-navigation/core';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {getOrderHistoryLineItemsData} from '../OrderManagement.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {PAGE_SIZE} from 'utils/Constants';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const OrderLineItem = () => {
  const route = useRoute<RouteProp<RootNavigationTypes, 'OrderLineItem'>>();
  const orderNo = route?.params?.orderNo ?? '';
  const fromOrderDetails = route?.params?.fromOrderDetails;

  const [lineItemsData, setLineItemsData] = useState<IDataResponse[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);

  const isLoading = useSelector((state: RootState) => state.modal.isLoading);

  const getLineItemsData = useCallback(() => {
    const requestBody = {
      ...(fromOrderDetails ? {orderNo} : {invoiceNo: orderNo}),
      pagination: {
        page: pageNumber,
        pageSize: PAGE_SIZE.OrderHistory,
      },
    };
    getOrderHistoryLineItemsData(
      requestBody,
      setLineItemsData,
      setTotalPages,
      fromOrderDetails,
    );
    setIsFilterApplied(false);
  }, [fromOrderDetails, orderNo, pageNumber]);

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      getLineItemsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied]);

  const emptyContainer = () =>
    isLoading ? null : (
      <View style={CommonStyles.flexOne}>
        <EmptyContainer title={'You do not have Line Items'} />
      </View>
    );

  return (
    <Layout headerTitle="Line Item">
      <FlatList
        data={lineItemsData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <DataCard key={index} data={item.data} isExpandableButtonVisible />
        )}
        contentContainerStyle={CommonStyles.padding}
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
    </Layout>
  );
};

export default OrderLineItem;
