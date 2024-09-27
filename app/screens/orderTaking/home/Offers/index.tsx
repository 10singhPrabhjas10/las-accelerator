import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {currentOffers} from '@/utils/dummyData';
import {Text} from 'react-native-paper';
import OfferCard from '@/components/OfferCard';
import CommonStyles from '@/utils/commonStyle';
import {getTranslationLabel} from '@/utils/commonMethods';
const Offers = () => {
  const data = currentOffers.data.offers;
  return (
    <View style={styles.parent}>
      <Text style={CommonStyles.marginVertical10} variant="headlineMedium">
        {getTranslationLabel('currrent_offers')}
      </Text>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={CommonStyles.paddingR10}
        renderItem={({item, index}) => {
          return (
            <View style={CommonStyles.marginL10}>
              <OfferCard
                title={item.title}
                subTitle={item.subTitle}
                actionText={item.offerAction}
                image={undefined}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  parent: {
    paddingLeft: 10,
    paddingVertical: 20,
  },
});
export default Offers;
