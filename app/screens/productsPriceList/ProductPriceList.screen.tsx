import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';

import Layout from 'components/Layout';
import ActionButton from 'components/button/ActionButton';

import ProductDisplay from '../../../assets/icons/productDisplay.svg';
import PriceList from '../../../assets/icons/priceList.svg';
import {COLORS} from 'theme/colors';
import CommonStyles from 'utils/commonStyle';
import {getTranslationLabel} from 'utils/commonMethods';

const ProductPriceList = () => {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <Layout
      headerTitle={getTranslationLabel('product_price_list')}
      style={CommonStyles.padding}>
      <ActionButton
        icon={<ProductDisplay color={COLORS.black} />}
        title={getTranslationLabel('product_display')}
        onPress={() => navigation.navigate('WebView')}
      />
      <ActionButton
        icon={<PriceList color={COLORS.black} />}
        title={getTranslationLabel('product_manual')}
        onPress={() =>
          navigation.navigate('ProductCategoryDisplay', {
            navigateTo: 'ProductDisplay',
          })
        }
      />
      <ActionButton
        icon={<PriceList color={COLORS.black} />}
        title={getTranslationLabel('price_list')}
        onPress={() =>
          navigation.navigate('ProductCategoryDisplay', {
            navigateTo: 'PriceList',
          })
        }
      />
    </Layout>
  );
};

export default ProductPriceList;
