import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import ListItem from '@/components/listItem/ListItem';
import {orderDashboard} from '@/utils/dummyData';
import {
  getDeviceWidth,
  heightToRatio,
  widthToRatio,
} from '@/utils/commonMethods';
import {COLORS} from '@/theme/colors';
import OrderBg from '../../../assets/images/orderBg.svg';
import ShoppingCartIcon from '../../../assets/icons/shopping_cart.svg';
import OrderList from '../orderList';
import Layout from '@/components/Layout';
import SearchInputWithCamera from '@/components/searchInputWithCamera/searchInputWithCamera';

const ProductDivion = () => {
  const productData = orderDashboard.data.pastOrders;
  const categoryData = orderDashboard.data.categories;
  const [searchText, setSearchText] = useState<string>('');
  const [searchImg, setSearchImg] = useState<any>();

  return (
    <>
      <View style={styles.searchView}>
        <SearchInputWithCamera
          onChangeText={text => setSearchText(text)}
          value={searchText}
          setPhoto={setSearchImg}
        />
      </View>
      <View style={styles.listContainer}>
        <OrderList
          title={'Categories'}
          data={categoryData}
          isGrid={true} // Pass isGrid as a prop to display items in a grid
        />
      </View>
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
  },
});
