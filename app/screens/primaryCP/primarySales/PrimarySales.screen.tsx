import {FlatList, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import FilterButton from 'components/button/FilterButton';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {useNavigation} from '@react-navigation/native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {RootNavigationProp} from 'routes/RootNavigation';
import {ID_ALL} from 'utils/Constants';
import {getPrimarySalesData} from '../PrimaryChannelPartner.business';
import PrimarySalesFilter from './PrimarySalesFilter';
import {getTranslationLabel} from 'utils/commonMethods';

const PrimarySales = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation<RootNavigationProp>();

  const [salesData, setSalesData] = useState<IPrimarySalesData[]>([]);
  const [filterData, setFilterData] = useState<IPrimarySalesFilters>({
    categoryIds: [],
    customDate: {
      fromDate: '',
    },
    selectedMonth: '',
  });

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);

  const isLoading = useSelector((state: RootState) => state.modal.isLoading);
  const channelPartnerId = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );

  const getSecondarySalesData = useCallback(
    (appliedFilters: IPrimarySalesFilters) => {
      const requestBody = {
        channelPartnerId,
        pagination: {
          page: pageNumber,
          pageSize: 10,
        },
        filters: {
          categoryIds: [
            ...appliedFilters.categoryIds.filter(item => item !== ID_ALL),
          ],
          customDate: appliedFilters.customDate,
        },
      };
      getPrimarySalesData(requestBody, setSalesData, setTotalPages);
      setIsFilterApplied(false);
    },
    [channelPartnerId, pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      getSecondarySalesData(filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied]);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setSalesData([]);
    setPageNumber(1);
    setIsFilterApplied(true);
  };

  const emptyContainer = () =>
    isLoading ? null : (
      <View style={CommonStyles.flexOne}>
        <EmptyContainer
          title={getTranslationLabel('no_primary_sales_data_msg')}
        />
      </View>
    );

  return (
    <Layout headerTitle={getTranslationLabel('primary_sales')}>
      <FlatList
        data={salesData}
        renderItem={({item, index}) => (
          <DataCard
            key={item?.salesData?.category_id + index}
            header={item.categoryName}
            data={item.data}
            showViewDetailsButton
            onPressViewLeadDetails={() =>
              navigation.navigate('PrimarySalesPerformance', {
                salesData: item.salesData,
                customerTargetId: item.customerTargetId,
                categoryId: item?.categoryId,
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        style={CommonStyles.flatListMargin}
        scrollEventThrottle={16}
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
      <FilterButton
        onPress={() => {
          bottomSheetModalRef.current?.present();
        }}
      />
      <BottomSheetModalComponent
        maxHeight={'75%'}
        minHeight={'75%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <PrimarySalesFilter
          filterData={filterData}
          setFilterData={setFilterData}
          onApplyFilter={handleApplyFilters}
          channelPartnerId={channelPartnerId}
          monthFilterRequired
          fromRetailerPerformance={false}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default PrimarySales;
