import {View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import FilterButton from 'components/button/FilterButton';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import ActiveSchemeFilter, {
  IFilterData,
} from '../../components/ActiveSchemeFilter';
import {
  ISecondarySchemeReqBody,
  ISecondarySchemeTransformed,
  SchemeStatus,
} from '../../SecondaryScheme.interface';
import {ID_ALL} from 'utils/Constants';
import {convertDateToDisplay} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {getSecondarySchemesData} from '../../SecondaryScheme.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const ActiveScheme = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'ActiveScheme'>>();
  const {navigationFrom} = route.params;
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const headerTitle =
    navigationFrom === SchemeStatus.ACTIVE
      ? 'Active Scheme'
      : navigationFrom === SchemeStatus.END_DATE_COMPLETED
      ? 'End Date Completed'
      : 'Aggregation Confirmed';

  const [schemeData, setSchemeData] = useState<ISecondarySchemeTransformed[]>(
    [],
  );
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [filterData, setFilterData] = useState<IFilterData>({
    dateFilter: [],
    categoryFilter: [],
    schemeNameFilter: [],
  });

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsFilterApplied(true);
    setSchemeData([]);
    setPageNumber(1);
    setTotalPages(1);
  };

  const fetchSecondarySchemes = useCallback(
    (status: string, appliedFilters: IFilterData) => {
      const requestBody: ISecondarySchemeReqBody = {
        pagination: {
          page: pageNumber,
          pageSize: 10,
        },
        filters: {
          schemeStatus: status,
          schemeNameIds:
            appliedFilters?.schemeNameFilter.length > 0
              ? appliedFilters?.schemeNameFilter.filter(item => item !== ID_ALL)
              : [],
          categoryIds:
            appliedFilters?.categoryFilter.length > 0
              ? appliedFilters?.categoryFilter.filter(item => item !== ID_ALL)
              : [],
          customDate: {
            fromDate:
              appliedFilters?.dateFilter?.length > 0
                ? convertDateToDisplay(
                    appliedFilters?.dateFilter?.[0],
                    DateFormats.YYYY_MM_DD,
                  )
                : '',
            toDate:
              appliedFilters?.dateFilter?.length > 0
                ? convertDateToDisplay(
                    appliedFilters?.dateFilter?.[1],
                    DateFormats.YYYY_MM_DD,
                  )
                : '',
          },
        },
      };
      getSecondarySchemesData(
        customerCode,
        requestBody,
        setSchemeData,
        setTotalPages,
      );
      setIsFilterApplied(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      fetchSecondarySchemes(navigationFrom, filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied, navigationFrom]);

  return (
    <Layout headerTitle={headerTitle}>
      <View style={CommonStyles.flexOne}>
        <FlatList
          data={schemeData}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            setPageNumber(prev => prev + 1);
            setIsFilterApplied(true);
          }}
          onEndReachedThreshold={0.5}
          scrollEventThrottle={16}
          style={CommonStyles.flatListMargin}
          renderItem={({item}) => (
            <DataCard
              data={item?.data}
              key={item?.id}
              header={item?.schemeName}
              showViewDetailsButton
              onPressViewLeadDetails={() => {
                navigation.navigate('SchemeDetails', {
                  schemeId: item?.schemeId,
                });
              }}
            />
          )}
          ListEmptyComponent={
            <EmptyContainer title="You do not have data for secondary schemes" />
          }
        />
      </View>
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'75%'}
        minHeight={'75%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <ActiveSchemeFilter
          onApplyFilter={handleApplyFilters}
          filterData={filterData}
          setFilterData={setFilterData}
          channelPartnerId={customerCode}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default ActiveScheme;
