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
import {divisionOrder} from '@/utils/dummyData';
const ProductDivion = () => {
  const [inDivision, setDivision] = useState<number>(1);
  const productData = orderDashboard.data.pastOrders;
  const categoryData = orderDashboard.data.categories;
  const divisionList = divisionOrder.data;
  const [searchText, setSearchText] = useState<string>('');
  const [searchImg, setSearchImg] = useState<any>();

  return (
    <>
      <Layout
        headerTitle={'Product Division'}
        onPressCustomLogo={() => {
          console.log('log');
          return false;
        }}
        customLogo={() => <CartLogo />}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <OrderSearch
            onChangeImage={setSearchImg}
            onChangeText={setSearchText}
          />
          <View style={styles.listContainer}>
            <OrderList
              title={divisionList.category.name}
              data={divisionList.division}
              onPressListItem={() => null}
              isGrid={true} // Pass isGrid as a prop to display items in a grid
            />
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};
export default ProductDivion;

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
