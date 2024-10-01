import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import ListItem from '@/components/listItem/ListItem';
import {orderDashboard} from '@/utils/dummyData';
import {
  getDeviceWidth,
  getTranslationLabel,
  heightToRatio,
  widthToRatio,
} from '@/utils/commonMethods';
import {COLORS} from '@/theme/colors';
import OrderBg from '../../../assets/images/orderBg.svg';
import ShoppingCartIcon from '../../../assets/icons/shopping_cart.svg';
import OrderList from '../orderList';
import Layout from '@/components/Layout';
import SearchInputWithCamera from '@/components/searchInputWithCamera/searchInputWithCamera';
import CommonStyles from '@/utils/commonStyle';
import OrderSearch from '@/components/orderSearch';
import CartLogo from '../../../../assets/icons/shopping_cart.svg';
import {divisionOrder, subCategoryOrder} from '@/utils/dummyData';
import {RootNavigationProp} from '@/routes/RootNavigation';
const ProductSubDivion = () => {
  const [inDivision, setDivision] = useState<number>(1);
  const productData = orderDashboard.data.pastOrders;
  const categoryData = orderDashboard.data.categories;
  const navigation = useNavigation<RootNavigationProp>();
  const divisionList = subCategoryOrder.data;
  const [searchText, setSearchText] = useState<string>('');
  const [searchImg, setSearchImg] = useState<any>();
  const goToProductSeries = () => {
    navigation.navigate('ProductSeries');
    return null;
  };
  const goToOrderSummary = () => {
    navigation.navigate('OrderSummary');
  };
  return (
    <>
      <Layout
        headerTitle={'Product Sub Division'}
        onPressCustomLogo={goToOrderSummary}
        customLogo={() => <CartLogo />}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <OrderSearch
            onChangeImage={setSearchImg}
            onChangeText={setSearchText}
          />
          <View style={styles.listContainer}>
            <OrderList
              title={divisionList.category.name}
              data={divisionList.sub_categories}
              onPressListItem={goToProductSeries}
              isGrid={true} // Pass isGrid as a prop to display items in a grid
            />
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};
export default ProductSubDivion;

export const styles = StyleSheet.create({
  titleLable: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 20,
    marginLeft: 16,
    color: COLORS.black,
    marginVertical: heightToRatio(20),
  },

  listContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGreenBackground,
  },
  searchView: {
    backgroundColor: COLORS.dDarkGreen,
    height: heightToRatio(88),
    paddingVertical: heightToRatio(10),
  },
});
