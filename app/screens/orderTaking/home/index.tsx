import OrderSearch from '@/components/orderSearch';
import React, {useState} from 'react';
import {getTranslationLabel} from '@/utils/commonMethods';
import OfferCard from '@/components/OfferCard';
import Offers from './Offers';
import PastOrders from './PastOrders';
import {categoryOrder} from '@/utils/dummyData';
import OrderList from '../orderList';
import Layout from '@/components/Layout';
import CartLogo from '../../../../assets/icons/shopping_cart.svg';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@/routes/RootNavigation';
const Home = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchImg, setSearchImg] = useState<any>();
  const categoryData = categoryOrder.data.categories;
  const navigation = useNavigation<RootNavigationProp>();
  const gotoDivision = () => {
    navigation.navigate('ProductDivision');
    return null;
  };
  return (
    <Layout
      headerTitle={'Product OverView'}
      onPressCustomLogo={() => {
        navigation.navigate('OrderSummary');
        return false;
      }}
      customLogo={() => <CartLogo />}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <OrderSearch
          title={getTranslationLabel('search_products')}
          onChangeImage={setSearchImg}
          onChangeText={setSearchText}
        />
        <Offers />
        <PastOrders />
        <OrderList
          data={categoryData}
          isGrid
          title={'Categories'}
          onPressListItem={gotoDivision}
        />
      </ScrollView>
    </Layout>
  );
};
export default Home;
