import {useNavigation} from '@react-navigation/native';
import Layout from 'components/Layout';
import ActionButton from 'components/button/ActionButton';
import React, {useState} from 'react';
import {RootNavigationProp} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import PrimaryUserProfile from '../../../assets/icons/primaryuserProfile.svg';
import SecondaryProfileIcon from '../../../assets/icons/secondaryProfileIcon.svg';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {LasType} from 'screens/performanceManagement/PerformanceMgmt.interface';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import ListItem from '@/components/listItem/ListItem';
import {orderDashboard} from '@/utils/dummyData';
import {getDeviceWidth, heightToRatio} from '@/utils/commonMethods';
import {COLORS} from '@/theme/colors';
import {Image} from 'react-native-svg';
import OrderBg from '../../../assets/images/orderBg.svg';
import {AutocompleteDropdown} from '@/components/auto-complete/AutocompleteDropdown';
import {TextInput} from 'react-native-paper';
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
  return (
    <Layout headerTitle={'Product Categories'}>
      <View style={{backgroundColor: COLORS.dDarkGreen}}>
        <OrderBg></OrderBg>
      </View>

      <ScrollView>
        <View style={styles.listContainer}>
          <RenderOrderList
            isListhorizontal={true}
            title={'Past Orders'}
            data={productData}
          />

          <RenderOrderList
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

export const RenderOrderList = ({
  data,
  title,
  isListhorizontal = false,
  isGrid = false, // New prop to handle grid layout
}: {
  data: any;
  title: string;
  isListhorizontal?: boolean;
  isGrid?: boolean;
}) => {
  const numColumns = isGrid ? 2 : 1; // Set number of columns for grid layout

  return (
    <View>
      <Text style={styles.titleLable}>{title}</Text>
      <FlatList
        data={data}
        horizontal={isListhorizontal}
        numColumns={numColumns} // Set the number of columns dynamically
        renderItem={({item}) => (
          <ListItem
            customContainerStyle={{
              alignItems: 'center',
              marginHorizontal: 10,
              width: isGrid ? getDeviceWidth(0.45) : getDeviceWidth(0.3), // Adjust width for grid layout
              marginBottom: 20, // Add space between rows
            }}
            title1={item.name}
            title2={item.price ?? ''}
            image={item.image}
          />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        key={isGrid ? 'grid' : 'list'} // Force re-render when numColumns changes
        contentContainerStyle={isGrid && styles.gridContainer} // Add container style for grid layout
      />
    </View>
  );
};

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
