import {View} from 'react-native';
import React, {useState} from 'react';
import Layout from 'components/Layout';
import {TabScreen, Tabs, TabsProvider} from 'react-native-paper-tabs';
import {COLORS} from 'theme/colors';

import ProductDocumentScreen from './productDocument/ProductDocument.screen';
import ProductVideoScreen from './productVideo/ProductVideo.screen';
import {getTranslationLabel} from 'utils/commonMethods';
import CommonStyles from 'utils/commonStyle';

const ProductDisplay = () => {
  const [index, setTabIndex] = useState(0);

  const handleChangeIndex = (tabIndex: number) => {
    setTabIndex(tabIndex);
  };

  return (
    <Layout headerTitle={getTranslationLabel('product_manual')}>
      <TabsProvider>
        <View style={CommonStyles.flexOne}>
          <Tabs disableSwipe theme={{colors: {surface: COLORS.white}}}>
            <TabScreen
              onPress={() => handleChangeIndex(0)}
              label={getTranslationLabel('product_document')}>
              <ProductDocumentScreen tabCurrentIndex={index} />
            </TabScreen>
            <TabScreen
              onPress={() => handleChangeIndex(1)}
              label={getTranslationLabel('product_video')}>
              <ProductVideoScreen tabCurrentIndex={index} />
            </TabScreen>
          </Tabs>
        </View>
      </TabsProvider>
    </Layout>
  );
};

export default ProductDisplay;
