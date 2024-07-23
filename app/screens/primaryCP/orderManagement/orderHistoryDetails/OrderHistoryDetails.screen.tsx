import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';

import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';

import CommonStyles from 'utils/commonStyle';
import ClipboardIcon from './../../../../../assets/icons/clipboardIcon.svg';
import ActionButton from 'components/button/ActionButton';
import {getOrderHistoryDetailsData} from '../OrderManagement.business';

const OrderHistoryDetails = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'OrderHistoryDetails'>>();
  const orderNo = route.params.orderNo;

  const [orderHistoryData, setOrderHistoryData] =
    useState<IOrderHistoryListProps>();

  useEffect(() => {
    getOrderHistoryDetailsData(orderNo, setOrderHistoryData);
  }, [orderNo]);

  return (
    <Layout
      headerTitle="Order History"
      style={CommonStyles.padding}
      isScrollable>
      <DataCard data={orderHistoryData?.data} header={orderHistoryData?.date} />
      <ActionButton
        title="Line Item"
        onPress={() =>
          navigation.navigate('OrderLineItem', {
            orderNo,
            fromOrderDetails: true,
          })
        }
        icon={<ClipboardIcon />}
      />
      <ActionButton
        title="Invoice Details"
        onPress={() =>
          navigation.navigate('InvoiceDetails', {
            fromOrderDetails: true,
            orderNo: orderHistoryData?.orderId || '',
          })
        }
        icon={<ClipboardIcon />}
      />
    </Layout>
  );
};

export default OrderHistoryDetails;
