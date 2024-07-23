import {FlatList, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';

import ProductTile from 'components/productTile/ProductTile';
import Layout from 'components/Layout';
import {getProductCategoryData} from './CategoryDisplay.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import EmptyPdf from '../../../../assets/icons/emptyPdf.svg';
import {COLORS} from 'theme/colors';
import CommonStyles from 'utils/commonStyle';
import {getTranslationLabel} from 'utils/commonMethods';

const ProductCategoryDisplay = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'ProductCategoryDisplay'>>();
  const [categoryData, setCategoryData] = useState<ICategoryResponseData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [onEndReached, setOnEndReached] = useState<boolean>(true);
  const {navigateTo} = route.params;

  const isLoading = useSelector((state: RootState) => state?.modal?.isLoading);

  const fetchCategoryData = useCallback(() => {
    getProductCategoryData(setCategoryData, pageNumber, 20, setTotalPages);
  }, [pageNumber]);

  useEffect(() => {
    if (pageNumber <= totalPages) {
      fetchCategoryData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const getHeaderName = () => {
    if (navigateTo === 'ProductDisplay') {
      return getTranslationLabel('product_manual');
    } else if (navigateTo === 'PriceList') {
      return getTranslationLabel('price_list_display');
    } else {
      return getTranslationLabel('scheme_dashboard');
    }
  };

  return (
    <Layout headerTitle={getHeaderName()} style={CommonStyles.paddingH10}>
      <FlatList
        data={categoryData}
        numColumns={2}
        keyExtractor={(item, index) => index + item?.id?.toString()}
        renderItem={({item}) => (
          <ProductTile
            key={item?.id}
            onPress={() =>
              navigation.navigate(navigateTo, {
                productId: item?.attributes?.categoryId,
                categoryName: item?.attributes?.categoryName,
              })
            }
            title={item?.attributes?.categoryName}
            imageSource={item?.attributes?.logo}
          />
        )}
        contentContainerStyle={CommonStyles.flexGrow}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyContainer
              title={getTranslationLabel('no_categories')}
              icon={
                <EmptyPdf width={110} height={110} color={COLORS.lightblue} />
              }
            />
          ) : null
        }
        initialNumToRender={20}
        onEndReached={() => {
          if (!onEndReached) {
            setPageNumber(prev => prev + 1);
            setOnEndReached(true);
          }
        }}
        onMomentumScrollBegin={() => {
          setOnEndReached(false);
        }}
        onEndReachedThreshold={0.7}
      />
    </Layout>
  );
};

export default ProductCategoryDisplay;

const styles = StyleSheet.create({
  columnWrapper: {justifyContent: 'space-around'},
  flatlistStyle: {paddingHorizontal: 12, marginTop: 20},
});
