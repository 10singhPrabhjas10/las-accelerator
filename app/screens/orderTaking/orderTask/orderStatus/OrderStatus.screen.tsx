import {FlatList, TouchableOpacity, View, Image} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';
import FilterButton from 'components/button/FilterButton';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import OrderFilter from './OrderFilter';
import {
  IFilterData,
  Relation,
} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import {
  getInvoicePdfData,
  getPrimaryOrderStatusData,
} from 'screens/orderTaking/OrderTaking.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {
  IOrderStatusReqBody,
  ITransformedOrderStatus,
} from 'screens/orderTaking/OrderTaking.interface';
import {ID_ALL, NavigationFrom} from 'utils/Constants';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {Text} from 'react-native-paper';

const OrderStatusScreen = () => {
  const route = useRoute<RouteProp<RootNavigationTypes, 'OrderStatus'>>();
  const {navigationFrom, relation} = route.params;

  const {relationId, customerCode, retailerCustomerCode} = useSelector(
    (state: RootState) => state?.channelPartner,
  );

  const code =
    navigationFrom === NavigationFrom.STORE_CHECKIN
      ? relationId
      : navigationFrom === NavigationFrom.SECONDARY_CP
      ? retailerCustomerCode
      : customerCode;
  const isPrimaryCP = relation === Relation.PRIMARY_CHANNEL_PARTNER;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [orderData, setOrderData] = useState<ITransformedOrderStatus[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const [filterData, setFilterData] = useState<IFilterData>({
    dateFilter: [],
    statusFilters: [],
  });

  const isLoading = useSelector((state: RootState) => state.modal.isLoading);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setOrderData([]);
    setPageNumber(1);
    setTotalPages(1);
    setIsFilterApplied(true);
  };

  const getPrimaryOrderStatus = useCallback(
    (appliedFilters: IFilterData) => {
      const requestBody: IOrderStatusReqBody = {
        filters: {
          channelPartnerId: code,
        },
        pagination: {
          page: pageNumber,
          pageSize: 10,
        },
      };
      if (appliedFilters?.statusFilters?.length > 0) {
        requestBody.filters.status = appliedFilters?.statusFilters.filter(
          item => item !== ID_ALL,
        );
      }

      if (appliedFilters?.dateFilter?.length > 0) {
        requestBody.filters.orderDate = {
          $gte: convertDateToDisplay(
            appliedFilters.dateFilter?.[0],
            DateFormats.YYYY_MM_DD,
          ),
          $lte: convertDateToDisplay(
            appliedFilters.dateFilter?.[1],
            DateFormats.YYYY_MM_DD,
          ),
        };
      }
      getPrimaryOrderStatusData(requestBody, setOrderData, setTotalPages);
      setIsFilterApplied(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied && isPrimaryCP) {
      getPrimaryOrderStatus(filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied, relation]);

  const downloadPdf = (invoiceNo: string) => {
    getInvoicePdfData(invoiceNo);
  };

  return (
    <Layout headerTitle={getTranslationLabel('primary_order_fulfillment')}>
      <FlatList
        data={orderData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <DataCard
            key={item?.id}
            data={item?.data}
            header={item?.name}
            headerStyle={styles.headerStyle}
            footer={
              item?.invoiceNo && (
                <TouchableOpacity
                  onPress={() => {
                    downloadPdf(item?.invoiceNo);
                  }}
                  style={styles.invoiceView}>
                  <Image
                    source={require('../../../../../assets/images/pdf.png')}
                    style={styles.image}
                  />
                  <View>
                    <Text variant="labelLarge">
                      {getTranslationLabel('order_invoice')}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
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
        style={CommonStyles.flatListMargin}
        ListEmptyComponent={
          isLoading ? null : (
            <EmptyContainer title={getTranslationLabel('no_order_data')} />
          )
        }
      />
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'75%'}
        minHeight={'75%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <OrderFilter
          onApplyFilter={handleApplyFilters}
          filterData={filterData}
          setFilterData={setFilterData}
          relation={relation}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    color: COLORS.black,
    fontWeight: '700',
  },
  invoiceView: {
    backgroundColor: COLORS.lightGrey2,
    height: 64,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 24,
    flexDirection: 'row',
  },
  image: {
    marginLeft: 16,
    marginRight: 12,
  },
  size: {
    color: COLORS.grey2,
  },
});

export default OrderStatusScreen;
