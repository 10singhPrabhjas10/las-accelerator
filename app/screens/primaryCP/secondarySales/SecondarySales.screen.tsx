import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {TextInput} from 'react-native-paper';
import SearchIcon from '../../../../assets/icons/searchIcon.svg';
import SortByIcon from '../../../../assets/icons/sortByIcon.svg';
import FilterButton from 'components/button/FilterButton';
import {FlatList, View} from 'react-native';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {RootState} from 'store/redux/store';
import {useSelector} from 'react-redux';
import {ID_ALL, SECONDARY_SALES_TYPE} from 'utils/Constants';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {
  gerSecondarySalesDetails,
  gerSecondarySalesRetailerData as getSecondarySalesRetailerData,
} from '../PrimaryChannelPartner.business';
import DataCard from 'components/dataCard/DataCard';
import Spacer from 'components/spacer';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import SecondarySalesFilter from '../components/SecondarySalesFilter';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import {AutocompleteDropdown} from 'components/auto-complete/AutocompleteDropdown';
import {TAutocompleteDropdownItem} from 'components/auto-complete/AutocompleteDropdown.interface';
import {debounce} from 'utils/commonMethods';

const PrimarySecondarySales = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation<RootNavigationProp>();

  const [salesData, setSalesData] = useState<ISecondarySalesData[]>([]);

  const [isSortFilter, setIsSortFilter] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<ISecondarySalesFilters>({
    retailerChannelPartnerId: '',
    categoryNames: [],
    sortBy: 'name',
  });

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const [retailerData, setRetailerData] = useState<TAutocompleteDropdownItem[]>(
    [],
  );

  const isLoading = useSelector((state: RootState) => state.modal.isLoading);

  const getSecondarySalesData = useCallback(
    (appliedFilters: ISecondarySalesFilters) => {
      const requestBody = {
        pagination: {
          page: pageNumber,
          pageSize: 10,
        },
        filters: {
          retailerChannelPartnerId: appliedFilters.retailerChannelPartnerId,
          categoryNames: [
            ...appliedFilters.categoryNames.filter(item => item !== ID_ALL),
          ],
          sortBy: appliedFilters.sortBy,
        },
      };
      gerSecondarySalesDetails(requestBody, setSalesData, setTotalPages);
      setIsFilterApplied(false);
    },
    [pageNumber],
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

  const handleCustomerSearch = debounce((searchText: string) => {
    getSecondarySalesRetailerData(searchText, setRetailerData);
  }, 1000);

  const emptyContainer = () =>
    isLoading ? null : (
      <View style={CommonStyles.flexOne}>
        <EmptyContainer title={'You do not have Secondary sales data'} />
      </View>
    );

  const searchIcon = () => <SearchIcon height={20} width={20} />;

  return (
    <Layout headerTitle="Secondary Sales" style={CommonStyles.padding}>
      <AutocompleteDropdown
        titleText=""
        placeholder="Search Retailer Name"
        dataSet={retailerData}
        onChangeText={handleCustomerSearch}
        onSelectItem={(data: any) => {
          setFilterData({
            ...filterData,
            retailerChannelPartnerId: data?.subTitle || '',
          });
          handleApplyFilters();
        }}
        icon={<TextInput.Icon icon={searchIcon} />}
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
      />

      <Spacer size={15} />
      <FlatList
        data={salesData}
        renderItem={({item}) => (
          <DataCard
            key={item.channelPartnerId}
            data={item.data}
            footer={
              <>
                <Spacer size={15} />
                <View style={CommonStyles.flexRowGap}>
                  <CustomButton
                    type={ButtonTypes.outline}
                    text="MTD Sales"
                    onPress={() =>
                      navigation.navigate('SecondarySalesPerformance', {
                        salesType: SECONDARY_SALES_TYPE.MTD,
                        retailerChannelPartnerId: item.channelPartnerId,
                      })
                    }
                    style={CommonStyles.flexOne}
                  />
                  <CustomButton
                    type={ButtonTypes.outline}
                    text="YTD Sales"
                    onPress={() =>
                      navigation.navigate('SecondarySalesPerformance', {
                        salesType: SECONDARY_SALES_TYPE.YTD,
                        retailerChannelPartnerId: item.channelPartnerId,
                      })
                    }
                    style={CommonStyles.flexOne}
                  />
                </View>
              </>
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        style={CommonStyles.flexOne}
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
      <View style={CommonStyles.flexRowGap}>
        <CustomButton
          type={ButtonTypes.outline}
          text="Sort By"
          icon={<SortByIcon />}
          onPress={() => {
            setIsSortFilter(true);
            bottomSheetModalRef.current?.present();
          }}
          style={CommonStyles.flexOne}
        />
        <FilterButton
          onPress={() => {
            setIsSortFilter(false);
            bottomSheetModalRef.current?.present();
          }}
          style={CommonStyles.flexOneMargin0}
        />
      </View>
      <BottomSheetModalComponent
        maxHeight={'75%'}
        minHeight={'75%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <SecondarySalesFilter
          isSortFilter={isSortFilter}
          filterData={filterData}
          onApplyFilter={handleApplyFilters}
          setFilterData={setFilterData}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default PrimarySecondarySales;
