import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {FlatList} from 'react-native';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import NoSecondaryScheme from '../../../../../../../assets/icons/noSecondaryScheme.svg';
import SchemeAccordionList from '../components/schemeAccordionList/SchemeAccordionList';
import FilterButton from 'components/button/FilterButton';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import SecondarySchemeFilter from '../SecondarySchemeFilter';
import {ISecondaryFilterData} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import {getSecondarySchemeListData} from '../SchemeLaunch.business';
import {ISecondaryScheme} from '../SchemeLaunch.interface';
import {COLORS} from 'theme/colors';
import {convertDateToDisplay} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {ID_ALL, NavigationFrom} from 'utils/Constants';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';

const SSchemeLaunchScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const route = useRoute<RouteProp<RootNavigationTypes, 'SSchemeLaunch'>>();
  const {navigationFrom} = route.params;
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner?.retailerCustomerCode,
  );
  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );
  const code =
    navigationFrom === NavigationFrom.SECONDARY_CP ? customerCode : relationId;

  const [secondarySchemeList, setSecondarySchemeList] = useState<
    ISecondaryScheme[]
  >([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const [isFilterApplied, setIsFilterApplied] = useState(true);

  const [filterData, setFilterData] = useState<ISecondaryFilterData>({
    schemeStatus: '',
    date: [],
    category: [],
    schemeName: [],
    schemeType: [],
  });

  const getSecondarySchemeData = useCallback(
    (appliedFilters: ISecondaryFilterData) => {
      const requestBody = {
        pagination: {
          page: pageNumber,
          pageSize: 10,
        },
        filters: {
          schemeStatus:
            appliedFilters?.schemeStatus === ''
              ? ''
              : appliedFilters?.schemeStatus,
          schemeType:
            appliedFilters?.schemeType?.length > 0
              ? appliedFilters.schemeType.filter(item => item !== ID_ALL)
              : '',
          categoryIds:
            appliedFilters?.category?.length > 0
              ? appliedFilters.category.filter(item => item !== ID_ALL)
              : [],
          schemeNameIds:
            appliedFilters?.schemeName?.length > 0
              ? appliedFilters.schemeName.filter(item => item !== ID_ALL)
              : [],
          customDate: {
            fromDate:
              appliedFilters.date?.length > 0
                ? convertDateToDisplay(
                    appliedFilters?.date?.[0],
                    DateFormats.YYYY_MM_DD,
                  )
                : '',
            toDate:
              appliedFilters.date?.length > 0
                ? convertDateToDisplay(
                    appliedFilters?.date?.[1],
                    DateFormats.YYYY_MM_DD,
                  )
                : '',
          },
        },
      };
      getSecondarySchemeListData(
        code,
        requestBody,
        setSecondarySchemeList,
        setPageCount,
      );
      setIsFilterApplied(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= pageCount && isFilterApplied) {
      getSecondarySchemeData(filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterApplied, pageNumber]);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsFilterApplied(true);
    setPageNumber(1);
    setSecondarySchemeList([]);
  };

  return (
    <Layout headerTitle="Secondary Scheme Info.">
      <FlatList
        data={secondarySchemeList}
        style={CommonStyles.flatListMargin}
        renderItem={({item, index}) => {
          return (
            <View key={index + item.categoryId}>
              <Text variant="bodySmall" style={styles.subHeading}>
                {item.category}
              </Text>
              <SchemeAccordionList
                relationId={code}
                data={item.data}
                showFooterButton
              />
            </View>
          );
        }}
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
        ListEmptyComponent={
          <EmptyContainer
            title={'You do not have any Secondary Schemes'}
            icon={<NoSecondaryScheme />}
          />
        }
        showsVerticalScrollIndicator={false}
      />
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'75%'}
        minHeight={'75%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <SecondarySchemeFilter
          filterData={filterData}
          setFilterData={setFilterData}
          onApplyFilter={handleApplyFilters}
          relationId={code}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

const styles = StyleSheet.create({
  subHeading: {
    color: COLORS.grey4,
  },
});

export default SSchemeLaunchScreen;
