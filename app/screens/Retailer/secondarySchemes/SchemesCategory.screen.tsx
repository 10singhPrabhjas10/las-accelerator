import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import ProductTile from 'components/productTile/ProductTile';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import {useSelector} from 'react-redux';
import {getSecondarySchemesCategories} from '../Retailer.business';
import {RootState} from 'store/redux/store';
import {getTranslationLabel} from 'utils/commonMethods';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const SchemesCategory = () => {
  const [categoryData, setCategoryData] = useState<ISchemeCategories[]>([]);
  const isLoading = useSelector((state: RootState) => state?.modal?.isLoading);

  useEffect(() => {
    getSecondarySchemesCategories(setCategoryData);
  }, []);

  const navigation = useNavigation<RootNavigationProp>();

  return (
    <Layout
      headerTitle={getTranslationLabel('scheme_dashboard')}
      style={CommonStyles.padding}>
      <FlatList
        data={categoryData}
        numColumns={2}
        renderItem={({item, index}) => (
          <ProductTile
            key={item.categoryId + index}
            onPress={() =>
              navigation.navigate('SchemePerformance', {
                categoryName: item?.categoryName,
              })
            }
            title={item?.categoryName}
            imageSource={item?.logo}
          />
        )}
        contentContainerStyle={CommonStyles.flexGrow}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={CommonStyles.justifyContentSpaceAround}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyContainer title={getTranslationLabel('no_categories')} />
          ) : null
        }
      />
    </Layout>
  );
};

export default SchemesCategory;
