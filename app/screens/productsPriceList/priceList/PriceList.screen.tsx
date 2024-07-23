import {FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {RouteProp, useRoute} from '@react-navigation/native';

import Layout from 'components/Layout';
import ProductItem from '../productItem/ProductItem';
import FilterButton from 'components/button/FilterButton';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import ProductDisplayFilterScreen from '../productDisplayFilter/ProductDisplayFilter';
import {getPriceListData, transformedDocData} from '../ProductPrice.business';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

import {COLORS} from 'theme/colors';
import EmptyPdf from '../../../../assets/icons/emptyPdf.svg';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import CommonStyles from 'utils/commonStyle';
import {DateFormats} from 'constants/dateFormat';

const PriceListScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const route = useRoute<RouteProp<RootNavigationTypes, 'ProductDisplay'>>();
  const productId = route.params.productId;
  const [categoryFilterValue, setCategoryFilterValue] = useState<string[]>([]);
  const [skuFilterValue, setSkuFilterValue] = useState<string[]>([]);
  const [dateValue, setDateValue] = useState<string[]>([]);
  const [priceList, setPriceList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const flatListRef = useRef<FlatList<any>>(null);

  const isLoading = useSelector((state: RootState) => state?.modal?.isLoading);

  const scrollToTop = () => {
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }
  };

  const getProductPriceList = useCallback(
    (
      categoryID: string,
      categoryFilter: string[],
      skuFilter: string[],
      dateFilter: string[],
    ) => {
      const requestBody: IPriceListRequestBody = {
        pagination: {
          page: pageNumber,
          pageSize: 10,
        },
        filters: {
          categoryId: categoryID,
        },
      };

      if (categoryFilter?.length > 0) {
        requestBody.filters.subCategoryId = categoryFilter;
      }

      if (skuFilter?.length > 0) {
        requestBody.filters.skuProduct = {
          $containsi: skuFilter,
        };
      }

      if (dateFilter?.length > 0) {
        requestBody.filters.youtubeCreatedAt = {
          $gte: convertDateToDisplay(dateFilter[0], DateFormats.YYYY_MM_DD),
          $lte: convertDateToDisplay(dateFilter[1], DateFormats.YYYY_MM_DD),
        };
      }

      getPriceListData(
        requestBody,
        priceList,
        setPriceList,
        setCategoryFilterValue,
        setSkuFilterValue,
        setDateValue,
        setTotalPages,
      );
      setIsFilterApplied(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied) {
      getProductPriceList(
        productId,
        categoryFilterValue,
        skuFilterValue,
        dateValue,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied, productId]);

  const handleApplyFilters = (
    subCategoryFilter: string[],
    skuFilter: string[],
    dateFilter: string[],
  ) => {
    bottomSheetModalRef.current?.dismiss();
    setCategoryFilterValue(subCategoryFilter);
    setSkuFilterValue(skuFilter);
    setDateValue(dateFilter);
    scrollToTop();
    setPriceList([]);
    setIsFilterApplied(true);
  };

  return (
    <Layout headerTitle={getTranslationLabel('price_list_display')}>
      <FlatList
        data={transformedDocData(priceList)}
        renderItem={({item, index}) => <ProductItem item={item} key={index} />}
        contentContainerStyle={CommonStyles.flexGrow}
        initialNumToRender={10}
        onEndReached={() => {
          setPageNumber(prev => prev + 1);
          setIsFilterApplied(true);
        }}
        onEndReachedThreshold={0.5}
        ref={flatListRef}
        scrollEventThrottle={16}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyContainer
              title={getTranslationLabel('no_price_documents')}
              icon={
                <EmptyPdf width={110} height={110} color={COLORS.lightblue} />
              }
            />
          ) : null
        }
      />
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'80%'}
        minHeight={'80%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <ProductDisplayFilterScreen
          isPriceListScreen={true}
          subCategoryFilter={categoryFilterValue}
          skuFilter={skuFilterValue}
          date={dateValue}
          categoryID={productId}
          isDocumentScreen={false}
          onApplyFilter={(
            subCategoryFilter: string[],
            skuFilter: string[],
            dateFilter: string[],
          ) => {
            setPageNumber(1);
            setTotalPages(1);
            handleApplyFilters(subCategoryFilter, skuFilter, dateFilter);
          }}
          onClearFilter={() => {
            handleApplyFilters([], [], []);
            setTotalPages(1);
            setPageNumber(1);
          }}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default PriceListScreen;
