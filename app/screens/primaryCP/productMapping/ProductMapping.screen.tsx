import React, {useCallback, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import {
  IProductMappingRequestBody,
  IProductMappingResponse,
  getProductMappingData,
} from './ProductMapping.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {FlatList} from 'react-native';
import DataCard from 'components/dataCard/DataCard';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import CommonStyles from 'utils/commonStyle';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {getTranslationLabel} from 'utils/commonMethods';

const ProductsMapping = () => {
  const customerCode = useSelector(
    (state: RootState) => state?.channelPartner?.customerCode,
  );
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [productData, setProductData] = useState<IProductMappingResponse[]>([]);

  const getProductMapping = useCallback(() => {
    const requestBody: IProductMappingRequestBody = {
      pagination: {
        page: pageNumber,
        pageSize: 10,
      },
    };
    getProductMappingData(
      setProductData,
      setTotalPages,
      requestBody,
      customerCode,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    if (pageNumber <= totalPages) {
      getProductMapping();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <Layout headerTitle={getTranslationLabel('product_mapping')}>
      <FlatList
        data={productData}
        renderItem={({item, index}) => (
          <DataCard
            data={[
              {
                title: getTranslationLabel('product_division'),
                text: item?.categoryName ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('customer_group'),
                text: item?.channelPartnerGroup ?? EMPTY_DATA_DASH,
              },
            ]}
            key={item.categoryId + index}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={CommonStyles.padding}
        initialNumToRender={10}
        onEndReached={() => {
          setPageNumber(prev => prev + 1);
        }}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <EmptyContainer title={getTranslationLabel('no_product_mapping')} />
        }
      />
    </Layout>
  );
};
export default ProductsMapping;
