import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';

import FilterButton from 'components/button/FilterButton';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import MappedRetailerFilter from '../components/MappedRetailerFilter';
import DataCard from 'components/dataCard/DataCard';
import Layout from 'components/Layout';
import {getMappedRetailerListData} from './MappedRetailer.business';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

import CommonStyles from 'utils/commonStyle';
import {ID_ALL, PAGE_SIZE} from 'utils/Constants';
import {RootState} from 'store/redux/store';

const MappedRetailer = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [mappedRetailerData, setMappedRetailerData] = useState<
    IMappedRetailerData[]
  >([]);
  const [filterData, setFilterData] = useState<IMappedRetailerFilters>({
    categoryIds: [],
  });
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);

  const isLoading = useSelector((state: RootState) => state.modal.isLoading);

  const getMappedRetailerData = useCallback(
    (appliedFilters: IMappedRetailerFilters) => {
      const requestBody = {
        pagination: {
          page: pageNumber,
          pageSize: PAGE_SIZE.RelatedCodes,
        },
        filters: {
          categoryIds: [
            ...appliedFilters.categoryIds.filter(item => item !== ID_ALL),
          ],
        },
      };
      getMappedRetailerListData(
        requestBody,
        customerCode,
        setMappedRetailerData,
        setTotalPages,
      );
      setIsFilterApplied(false);
    },
    [pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      getMappedRetailerData(filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied]);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setMappedRetailerData([]);
    setPageNumber(1);
    setIsFilterApplied(true);
  };
  return (
    <Layout headerTitle="Mapped Retailer">
      <FlatList
        data={mappedRetailerData}
        renderItem={({item, index}) => {
          return (
            <DataCard
              header={'Retailer ID: ' + item.retailerId}
              data={item.data}
              key={index + item.retailerId}
            />
          );
        }}
        contentContainerStyle={CommonStyles.padding}
        initialNumToRender={PAGE_SIZE.MappedRetailer}
        showsVerticalScrollIndicator={false}
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
            <EmptyContainer title="You do not have any Related Codes" />
          )
        }
      />
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        ref={bottomSheetModalRef}
        maxHeight={'75%'}
        minHeight={'75%'}
        isFilter>
        <MappedRetailerFilter
          filterData={filterData}
          setFilterData={setFilterData}
          onApplyFilter={handleApplyFilters}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default MappedRetailer;
