import React from 'react';
import CardWrapper from '../card/Card';
import {Text} from 'react-native-paper';
import {
  Image,
  View,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {widthToRatio} from '@/utils/commonMethods';
import CommonStyles from '@/utils/commonStyle';
import GreenCart from '../../../assets/images/green_cart_icon.svg';
import OrderSticker from '../../../assets/images/order_sticker.svg';
interface IPastOrderCard {
  title: string;
  image: ImageSourcePropType;
  price: string;
  currency: string;
}
const PastOrderCard = ({
  title = 'title',
  image = require('../../../assets/images/offer_dummy_image.png'),
  price = '123',
  currency = '$',
}: IPastOrderCard) => {
  return (
    <View style={CommonStyles.padding5}>
      <CardWrapper cardStyle={style.parent}>
        <Image style={[style.image, {alignSelf:'center'}]} source={image} />
        <Text numberOfLines={2} variant="titleMedium" style={{ textAlign: 'center'}}>
          {title}
        </Text>
        <View style={style.cartView}>
          <View style={CommonStyles.flexRow}>
            <Text variant="titleMedium">{currency}</Text>
            <Text variant="titleMedium">{price}</Text>
          </View>
          <TouchableOpacity>
            <GreenCart />
          </TouchableOpacity>
        </View>
        <OrderSticker width={38} height={36} style={style.sticker} />
      </CardWrapper>
    </View>
  );
};
const style = StyleSheet.create({
  parent: {
    width: widthToRatio(126),
    minHeight: widthToRatio(165),
    alignItems: 'center',
  },
  cartView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sticker: {
    position: 'absolute',
    top: -15,
    left: 0,
  },
  image: {
    width: widthToRatio(88),
    aspectRatio: 1,
  },
});
export default PastOrderCard;
