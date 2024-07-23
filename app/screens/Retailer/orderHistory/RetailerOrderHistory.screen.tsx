import {FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {getEasyDmsOrderStatusData} from 'screens/orderTaking/OrderTaking.business';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {IRetailerOrderHistoryData} from './RetailerOrderHistory.interface';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';

const RetailerOrderHistory = () => {
  const [orderData, setOrderData] = useState<IRetailerOrderHistoryData[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const navigation = useNavigation<RootNavigationProp>();

  const isLoading = useSelector((state: RootState) => state.modal.isLoading);

  const getOrderStatusData = useCallback((page: number) => {
    const requestBody = {
      StartDate: '',
      EndDate: '',
      DistributorCode: '',
      PageIndex: page,
      PerPageRecord: 10,
    };
    getEasyDmsOrderStatusData(requestBody, setOrderData, true);
    setIsFilterApplied(false);
  }, []);

  useEffect(() => {
    if (isFilterApplied) {
      getOrderStatusData(pageNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterApplied]);

  return (
    <Layout headerTitle="Order History" style={CommonStyles.padding}>
      <FlatList
        data={orderData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <DataCard
            key={item?.id}
            header={item?.date}
            data={item?.headerData}
            showViewDetailsButton
            onPressViewLeadDetails={() =>
              navigation.navigate('RetailerOrderDetails', {
                orderData: item,
              })
            }
          />
        )}
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
        ListEmptyComponent={
          isLoading ? null : (
            <EmptyContainer title="You do not have any order data" />
          )
        }
      />
    </Layout>
  );
};

export default RetailerOrderHistory;
