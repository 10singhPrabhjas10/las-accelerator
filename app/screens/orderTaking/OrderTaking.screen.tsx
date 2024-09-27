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
import {RootNavigationProp} from '@/routes/RootNavigation';
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
  const navigation = useNavigation<RootNavigationProp>();
  const productData = orderDashboard.data.pastOrders;
  const categoryData = orderDashboard.data.categories;
  return (
    <Layout
      headerTitle={'Product Categories'}
      onPressCustomLogo={() => {
        navigation.navigate('OrderSummary');
      }}
      style={{paddingHorizontal: widthToRatio(24)}}
      customLogo={() => <ShoppingCartIcon />}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          <OrderList
            isListhorizontal={true}
            title={'Past Orders'}
            data={productData}
          />

          <OrderList
            title={'Categories'}
            data={categoryData}
            isGrid={true} // Pass isGrid as a prop to display items in a grid
          />
        </View>
      </ScrollView>
    </Layout>
  );
};
export default OrderTaking;

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
});
