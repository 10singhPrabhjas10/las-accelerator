import {View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {COLORS} from 'theme/colors';
import FilterButton from 'components/button/FilterButton';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import ProductDisplayFilterScreen from 'screens/productsPriceList/productDisplayFilter/ProductDisplayFilter';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import EmptyPdf from '../../../../../assets/icons/emptyPdf.svg';
import ProductItem from '../../productItem/ProductItem';
import {
  getProductDocumentData,
  transformedDocData,
} from 'screens/productsPriceList/ProductPrice.business';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {RouteProp, useRoute} from '@react-navigation/native';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import CommonStyles from 'utils/commonStyle';

const ProductDocumentScreen = ({tabCurrentIndex}: IProductDisplayProps) => {
  const route = useRoute<RouteProp<RootNavigationTypes, 'ProductDisplay'>>();
  const productId = route.params.productId;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [categoryFilterValue, setCategoryFilterValue] = useState<string[]>([]);
  const [skuFilterValue, setSkuFilterValue] = useState<string[]>([]);
  const [dateValue, setDateValue] = useState<string[]>([]);
  const [dropDownValue, setDropdownValue] = useState('');
  const [contentFilterValue, setContentFilterValue] = useState<string[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [documentData, setDocumentData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);

  const flatListRef = useRef<FlatList<any>>(null);

  const getProductDocument = useCallback(
    (
      categoryID: string,
      categoryFilter: string[],
      skuFilter: string[],
      typeFilter: string[],
      dateFilter: string[],
    ) => {
      const requestBody: IDocumentRequestBody = {
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
      if (typeFilter?.length > 0) {
        requestBody.filters.documentType = {
          $containsi: typeFilter,
        };
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

      getProductDocumentData(
        requestBody,
        documentData,
        setDocumentData,
        setCategoryFilterValue,
        setSkuFilterValue,
        setContentFilterValue,
        setDateValue,
        setTotalPages,
      );
      setIsFilterApplied(false);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= totalPages && isFilterApplied && tabCurrentIndex === 0) {
      getProductDocument(
        productId,
        categoryFilterValue,
        skuFilterValue,
        contentFilterValue,
        dateValue,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isFilterApplied, productId, tabCurrentIndex]);

  const handleApplyFilters = (
    subCategoryFilter: string[],
    skuFilter: string[],
    dateFilter: string[],
    dateFilterValue?: string,
    contentFilter?: string[],
  ) => {
    bottomSheetModalRef.current?.dismiss();
    setCategoryFilterValue(subCategoryFilter);
    setSkuFilterValue(skuFilter);
    setDateValue(dateFilter);
    setDropdownValue(dateFilterValue ?? '');
    contentFilter && setContentFilterValue(contentFilter);
    scrollToTop();
    setDocumentData([]);
    setIsFilterApplied(true);
  };

  const removeFilters = () => {
    setCategoryFilterValue([]);
    setSkuFilterValue([]);
    setDateValue([]);
    setDropdownValue('');
    setContentFilterValue([]);
    setTotalPages(1);
    setPageNumber(1);
    setDropdownValue('');
  };

  useEffect(() => {
    if (!isFilterApplied) {
      setIsFilterApplied(true);
    }
    setDocumentData([]);

    removeFilters();
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabCurrentIndex]);

  const scrollToTop = () => {
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }
  };

  return (
    <View style={CommonStyles.flexOne}>
      <FlatList
        data={transformedDocData(documentData)}
        renderItem={({item, index}) => (
          <ProductItem item={item} key={item.categoryId + index} />
        )}
        initialNumToRender={10}
        onEndReached={() => {
          setPageNumber(prev => prev + 1);
          setIsFilterApplied(true);
        }} // Optimized handler
        onEndReachedThreshold={0.5}
        style={CommonStyles.flexOne}
        ref={flatListRef}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <EmptyContainer
            title={getTranslationLabel('no_product_documents')}
            icon={
              <EmptyPdf width={110} height={110} color={COLORS.lightblue} />
            }
          />
        }
      />
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'80%'}
        minHeight={'80%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <ProductDisplayFilterScreen
          subCategoryFilter={categoryFilterValue}
          skuFilter={skuFilterValue}
          dropDownType={dropDownValue}
          date={dateValue}
          typeFilter={contentFilterValue}
          categoryID={productId}
          isDocumentScreen={true}
          onApplyFilter={(
            subCategoryFilter: string[],
            skuFilter: string[],
            dateFilter: string[],
            dateFilterValue?: string,
            contentFilter?: string[],
          ) => {
            setPageNumber(1);
            setTotalPages(1);
            handleApplyFilters(
              subCategoryFilter,
              skuFilter,
              dateFilter,
              dateFilterValue,
              contentFilter,
            );
          }}
          onClearFilter={() => {
            handleApplyFilters([], [], [], '', []);
            setTotalPages(1);
            setPageNumber(1);
            setDropdownValue('');
          }}
        />
      </BottomSheetModalComponent>
    </View>
  );
};

export default ProductDocumentScreen;
