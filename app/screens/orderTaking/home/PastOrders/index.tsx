import PastOrderCard from '@/components/PastOrderCard';
import {getTranslationLabel} from '@/utils/commonMethods';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {pastOrder} from '@/utils/dummyData';
import CommonStyles from '@/utils/commonStyle';
const PastOrders = () => {
  const pastOrders = pastOrder.data.past_order;
  return (
    <View style={style.parent}>
      <Text variant="headlineSmall" style={[CommonStyles.marginVertical5, CommonStyles.marginL10]}>{getTranslationLabel('past_orders')}</Text>
      <FlatList
        data={pastOrders}
        horizontal
        style={CommonStyles.marginVertical10}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={CommonStyles.padding5}>
              <PastOrderCard
                title={item.product_name}
                price={item.product_price}
                currency={item.currency_symbol}
                image={item.product_image_url}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  parent: {
    paddingLeft: 10,
  },
});
export default PastOrders;
