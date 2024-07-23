import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import FilterButton from 'components/button/FilterButton';

import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import {RootState} from 'store/redux/store';
import {useSelector} from 'react-redux';
import {PAGE_SIZE} from 'utils/Constants';
import {View} from 'react-native-animatable';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {getOrderInvoicesData} from '../OrderManagement.business';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import InvoiceDetailsFilter from '../components/InvoiceDetailsFilter';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const InvoiceDetails = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const route = useRoute<RouteProp<RootNavigationTypes, 'InvoiceDetails'>>();
  const {orderNo, fromOrderDetails} = route?.params;

  const [invoiceData, setInvoiceData] = useState<IOrderInvoiceData[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const [filterData, setFilterData] = useState<IOrderInvoiceFilterData>({
    epod: '',
    invoiceDate: {
      fromDate: '',
      toDate: '',
    },
  });

  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );
  const isLoading = useSelector((state: RootState) => state.modal.isLoading);

  const getInvoiceData = useCallback(
    (appliedFilters: IOrderInvoiceFilterData) => {
      const requestBody = {
        ...(fromOrderDetails ? {orderNo} : {channelPartnerId: customerCode}),
        pagination: {
          page: pageNumber,
          pageSize: PAGE_SIZE.OrderHistory,
        },
        ...(!fromOrderDetails && {
          filters: {
            epod: appliedFilters.epod,
            invoiceDate: {
              fromDate: appliedFilters.invoiceDate.fromDate,
              toDate: appliedFilters.invoiceDate.toDate,
            },
          },
        }),
      };
      getOrderInvoicesData(
        requestBody,
        setInvoiceData,
        setTotalPages,
        fromOrderDetails,
      );
      setIsFilterApplied(false);
    },
    [customerCode, fromOrderDetails, orderNo, pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      getInvoiceData(filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied]);

  const emptyContainer = () =>
    isLoading ? null : (
      <View style={CommonStyles.flexOne}>
        <EmptyContainer title={'You do not have Invoice Details'} />
      </View>
    );

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsFilterApplied(true);
    setInvoiceData([]);
    setPageNumber(1);
    setTotalPages(1);
  };

  return (
    <Layout headerTitle="Invoice Details">
      <FlatList
        data={invoiceData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <DataCard
            key={index}
            data={item.data}
            header={item.date}
            showViewDetailsButton
            onPressViewLeadDetails={() => {
              if (fromOrderDetails) {
                navigation.navigate('InvoiceDetailsViewDetails', {
                  invoiceNo: item.invoiceNo,
                });
              } else {
                navigation.navigate('InvoiceDetailsMoreDetails', {
                  invoiceNo: item.invoiceId,
                });
              }
            }}
          />
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
      {!fromOrderDetails && (
        <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      )}
      <BottomSheetModalComponent
        maxHeight={'77%'}
        minHeight={'77%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <InvoiceDetailsFilter
          filterData={filterData}
          setFilterData={setFilterData}
          onApplyFilter={handleApplyFilters}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default InvoiceDetails;
