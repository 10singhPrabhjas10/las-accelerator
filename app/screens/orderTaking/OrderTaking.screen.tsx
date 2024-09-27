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
import OrderList from './orderList';
import Layout from '@/components/Layout';
import SearchInputWithCamera from '@/components/searchInputWithCamera/searchInputWithCamera';
import ProductDivion from './productDivision';
import ProductSeries from '../productSeries/productSeries';
import Home from './home';
//--------old screen
// const OrderTaking = () => {
//   const navigation = useNavigation<RootNavigationProp>();
//   const lasType = useSelector((state: RootState) => state?.user?.user?.lasType);

//   const isReLasType = lasType === LasType.RE;

//   return (
//     <Layout style={CommonStyles.padding} headerTitle="Order Taking">
//       <View style={CommonStyles.flexOne}>
//         {!isReLasType ? (
//           <ActionButton
//             icon={<PrimaryUserProfile width={24} height={24} />}
//             title="Primary Order Taking"
//             onPress={() => {
//               navigation.navigate('PrimaryPartnerSearch', {
//                 fromOrderTaking: true,
//               });
//             }}
//           />
//         ) : null}
//         <ActionButton
//           icon={<SecondaryProfileIcon width={24} height={24} />}
//           title="Secondary Order Taking"
//           onPress={() => {
//             navigation.navigate('RetailerPartnerSearch', {
//               fromOrderTaking: true,
//             });
//           }}
//         />
//       </View>
//     </Layout>
//   );
// };

//--------new screen--------

const OrderTaking = () => {
  const productData = orderDashboard.data.pastOrders;
  const categoryData = orderDashboard.data.categories;
  const navigation = useNavigation();
  return <Text onPress={() => navigation.navigate('OrderHome')}>PressMe</Text>;
};
export default OrderTaking;

export const styles = StyleSheet.create({});
