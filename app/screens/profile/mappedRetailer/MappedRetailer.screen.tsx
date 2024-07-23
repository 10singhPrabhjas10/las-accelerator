import {View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import FilterButton from 'components/button/FilterButton';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import MappedFilter, {IFilterData} from './MappedFilter';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {
  IMappedRetailerReqBody,
  IRetailerData,
  ITransformedRetailer,
} from '../Profile.interface';
import {getMappedRetailersData} from '../Profile.business';
import {ID_ALL} from 'utils/Constants';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {COLORS} from 'theme/colors';
import {getTranslationLabel} from 'utils/commonMethods';

const MappedRetailerScreen = () => {
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'MappedProfileRetailer'>>();
  const {code} = route.params;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [retailerData, setRetailerData] = useState<ITransformedRetailer[]>([]);
  const [filterData, setFilterData] = useState<IFilterData>({
    productFilter: [],
  });
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);

  const getRetailerData = useCallback(
    (filterType: IFilterData) => {
      const requestBody: IMappedRetailerReqBody = {
        pagination: {
          page: pageNumber,
          pageSize: 10,
        },
        filters: {
          categoryIds:
            filterType?.productFilter?.length > 0
              ? filterType?.productFilter.filter(item => item !== ID_ALL)
              : [],
        },
      };
      getMappedRetailersData(requestBody, setRetailerData, setTotalPages, code);
      setIsFilterApplied(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      getRetailerData(filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied]);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsFilterApplied(true);
    setPageNumber(1);
    setTotalPages(1);
    setRetailerData([]);
  };

  return (
    <Layout headerTitle={getTranslationLabel('mapped_retailer')}>
      {retailerData?.length <= 0 && (
        <EmptyContainer title={getTranslationLabel('no_mapped_retailer')} />
      )}
      <FlatList
        data={retailerData}
        onEndReached={() => {
          setPageNumber(prev => prev + 1);
          setIsFilterApplied(true);
        }}
        style={CommonStyles.flatListMargin}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        initialNumToRender={10}
        renderItem={({item, index}) => {
          return (
            <View key={item?.categoryId + index}>
              <Text style={styles.header}>{item?.category}</Text>
              {item?.data?.map((card: IRetailerData, index) => (
                <DataCard key={index} data={card?.cardData} />
              ))}
            </View>
          );
        }}
      />
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'75%'}
        minHeight={'75%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <MappedFilter
          onApplyFilter={handleApplyFilters}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};
const styles = StyleSheet.create({
  header: {
    marginVertical: 12,
    color: COLORS.grey2,
  },
});

export default MappedRetailerScreen;
