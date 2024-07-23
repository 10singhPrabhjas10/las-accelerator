import {FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import FilterButton from 'components/button/FilterButton';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BTLFilter, {IFilterData} from './BTLFilter';
import {getBTLRequestList} from '../BTL.business';
import {IBTLListRequestBody, ITransformedBTLData} from '../BTL.interface';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {ID_ALL} from 'utils/Constants';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const BTLActivationScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [btlList, setBTLList] = useState<ITransformedBTLData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const flatListRef = useRef<FlatList<any>>(null);

  const [filterData, setFilterData] = useState<IFilterData>({
    dateFilter: [],
    statusFilter: [],
  });

  const getBtlList = useCallback(
    (filterType: IFilterData) => {
      const reqBody: IBTLListRequestBody = {
        pagination: {
          page: pageNumber,
          pageSize: 10,
        },
        filters: {},
        sort: {
          updatedAt: 'desc',
        },
      };
      if (filterType?.dateFilter?.length > 0) {
        reqBody.filters.requestDate = {
          $gte: convertDateToDisplay(
            filterType.dateFilter?.[0],
            DateFormats.YYYY_MM_DD,
          ),
          $lte: convertDateToDisplay(
            filterType.dateFilter?.[1],
            DateFormats.YYYY_MM_DD,
          ),
        };
      }
      if (filterType?.statusFilter?.length > 0) {
        reqBody.filters.status = filterType?.statusFilter.filter(
          item => item !== ID_ALL,
        );
      }

      getBTLRequestList(reqBody, setBTLList, setTotalPages);
      setIsFilterApplied(false);
    },
    [pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      getBtlList(filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied]);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsFilterApplied(true);
    setBTLList([]);
    setPageNumber(1);
    setTotalPages(1);
    scrollToTop();
  };

  const scrollToTop = () => {
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }
  };

  return (
    <Layout headerTitle={getTranslationLabel('btl_activation')}>
      {btlList?.length <= 0 && (
        <EmptyContainer title={getTranslationLabel('no_btl_request_found')} />
      )}
      <FlatList
        data={btlList}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        ref={flatListRef}
        style={CommonStyles.flatListMargin}
        onEndReached={() => {
          setPageNumber(prev => prev + 1);
          setIsFilterApplied(true);
        }}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        renderItem={({item}) => (
          <DataCard key={item.id} data={item.data} header={item?.btlNo} />
        )}
      />
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'75%'}
        minHeight={'75%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <BTLFilter
          onApplyFilter={handleApplyFilters}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default BTLActivationScreen;
