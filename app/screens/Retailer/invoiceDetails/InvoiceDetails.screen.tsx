import {FlatList, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {getInvoiceDetailsData} from './Invoice.business';
import {
  IInvoiceDetailsReqBody,
  IInvoiceDetailsTransformed,
} from './Invoice.interface';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const InvoiceDetailsScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner?.retailerCustomerCode,
  );
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'InvoiceDetailsSecondary'>>();
  const {retailerCode} = route.params;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [invoiceData, setInvoiceData] = useState<IInvoiceDetailsTransformed[]>(
    [],
  );

  const isLoading = useSelector((state: RootState) => state.modal.isLoading);

  const fetchInvoiceData = useCallback(() => {
    const requestBody: IInvoiceDetailsReqBody = {
      retailerId: retailerCode,
      channelPartnerId: customerCode,
      pagination: {
        page: pageNumber,
        perPage: 10,
      },
    };
    getInvoiceDetailsData(setInvoiceData, setTotalPages, requestBody);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    if (pageNumber <= totalPages) {
      fetchInvoiceData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const emptyContainer = () =>
    isLoading ? null : (
      <View style={CommonStyles.flexOne}>
        <EmptyContainer title={'You do not have Invoice Details'} />
      </View>
    );

  return (
    <Layout style={CommonStyles.padding} headerTitle="Invoice Details">
      <FlatList
        data={invoiceData}
        initialNumToRender={10}
        onEndReached={() => {
          setPageNumber(prev => prev + 1);
        }}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        renderItem={({item}) => (
          <DataCard
            showViewDetailsButton
            onPressViewLeadDetails={() => {
              navigation.navigate('ViewInvoiceDetails', {
                invoiceNo: item.invoiceNo,
                showDetailsButton: true,
              });
            }}
            header={item?.date}
            key={item?.id}
            data={item?.data}
          />
        )}
        ListEmptyComponent={emptyContainer()}
      />
    </Layout>
  );
};

export default InvoiceDetailsScreen;
