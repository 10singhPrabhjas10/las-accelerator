import {FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import FilterButton from 'components/button/FilterButton';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import {ISecondaryOrderFilterData} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import {getEasyDmsOrderStatusData} from 'screens/orderTaking/OrderTaking.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {ITransformedOrderStatus} from 'screens/orderTaking/OrderTaking.interface';
import SecondaryOrderFilter from './SecondaryOrderFilter';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';

const SecondaryOrderStatus = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [orderData, setOrderData] = useState<ITransformedOrderStatus[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const [filterData, setFilterData] = useState<ISecondaryOrderFilterData>({
    endDate: '',
    startDate: '',
  });

  const isLoading = useSelector((state: RootState) => state.modal.isLoading);

  const handleApplyFilters = () => {
    setOrderData([]);
    setPageNumber(0);
    setIsFilterApplied(true);
    bottomSheetModalRef.current?.dismiss();
  };

  const getOrderStatusData = useCallback(
    (appliedFilters: ISecondaryOrderFilterData, page: number) => {
      const requestBody = {
        StartDate: appliedFilters.startDate
          ? convertDateToDisplay(
              appliedFilters.startDate,
              DateFormats.DD_MMM_YYYY_2,
            )
          : '',
        EndDate: appliedFilters.endDate
          ? convertDateToDisplay(
              appliedFilters.endDate,
              DateFormats.DD_MMM_YYYY_2,
            )
          : '',
        DistributorCode: '',
        PageIndex: page,
        PerPageRecord: 10,
      };
      getEasyDmsOrderStatusData(requestBody, setOrderData);
      setIsFilterApplied(false);
    },
    [],
  );

  useEffect(() => {
    if (isFilterApplied) {
      getOrderStatusData(filterData, pageNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterApplied]);

  return (
    <Layout headerTitle={getTranslationLabel('sec_order_fulfillment')}>
      <FlatList
        data={orderData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <DataCard
            key={item?.id}
            data={item?.data}
            isExpandableButtonVisible
            rows={4}
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
        style={CommonStyles.flatListMargin}
        onMomentumScrollBegin={() => setOnEndReached(false)}
        onEndReachedThreshold={0.7}
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
        <SecondaryOrderFilter
          onApplyFilter={handleApplyFilters}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default SecondaryOrderStatus;
