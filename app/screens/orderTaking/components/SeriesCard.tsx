import CardWrapper from '@/components/card/Card';
import React, {useState} from 'react';
import {
  Image,
  ImageProps,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import {COLORS} from '@/theme/colors';
import {Text, Icon} from 'react-native-paper';
import DeleteIcon from '../../../../assets/icons/deleteIcon.svg';
import {formatNumberWithCommas} from '@/utils/commonMethods';
import {ProductList} from '../productSeries/productSeries';
import Check from '../../../../assets/icons/check.svg';
interface ISeriesCardProps {
  id: number;
  title?: string;
  onAddPress: () => void;
  image: ImageProps;
  seriesName: string;
  skuName: string;
  skuId: string;
  price: string;
  gradientColors?: string[];
  header?: boolean;
  onDeletePress?: () => void;
  productsAdded?: ProductList | undefined;
  fromSummaryScreen?: boolean;
  isBorderGradient?: Boolean;
}
const whiteGradient = [COLORS.white, COLORS.white];
const linearGradientColors = [
  '#00914F',
  '#00914F',
  '#00914F',
  '#009467',
  '#00957D',
  '#00978F',
  '#00979E',
  '#0097A9',
];

const SeriesCard = ({
  id,
  title,
  onAddPress = () => {},
  image,
  seriesName,
  skuName,
  skuId,
  price,
  onDeletePress,
  productsAdded,
  gradientColors = linearGradientColors,
  header = true,
  fromSummaryScreen = false,
  itemQuantity = 0,
  isBorderGradient = true,
}: ISeriesCardProps) => {
  const product = productsAdded?.[id];
  const isAddedToCart = product?.quantity && product?.quantity > 1;
  const [quantity, setQuantity] = useState(itemQuantity);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    setIsAdded(true);
    // setQuantity(1); // Start with 1 item
  };

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setIsAdded(false); // Hide stepper and show "Add" button again if quantity is 0
      setQuantity(0);
    }
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={isBorderGradient ? linearGradientColors : whiteGradient}
      style={styles.linearGradient2}>
      <CardWrapper cardStyle={styles.cardWrapper}>
        {header && (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={gradientColors}
            style={styles.linearGradient}>
            {isBorderGradient && <Check />}
            {/* tick will wotk as per border only as check will show only when border is gradient  */}
            <Text style={{color: COLORS.white}}>{title}</Text>
          </LinearGradient>
        )}

        <View style={[styles.bodyStyle, header ? {marginTop: 10} : undefined]}>
          <Image source={image} style={{width: 70, height: 70}} />
          <View style={styles.descriptionStyle}>
            <View style={styles.descriptionView}>
              <View>
                <Text style={{fontSize: 18}}>{seriesName}</Text>
                <Text style={styles.skuStyle}>
                  SKU: {skuName} •{' '}
                  <Text style={styles.skuIdStyle}>{skuId} AVL</Text>
                </Text>
              </View>
              {onDeletePress && (
                <DeleteIcon
                  onPress={onDeletePress}
                  style={{justifyContent: 'flex-end'}}
                />
              )}
            </View>
            <View style={styles.footerAction}>
              <Text style={styles.price}>
                ₹ {formatNumberWithCommas(parseInt(price))}
                {quantity && <Text style={styles.quantity}> X {quantity}</Text>}
              </Text>

              {isAdded || quantity > 0 ? (
                // <View style={styles.stepperView}>
                //   <TouchableOpacity onPress={handleDecrement}>
                //     <Icon
                //       color={COLORS.dgreen}
                //       size={20}
                //       source={'minus'}></Icon>
                //   </TouchableOpacity>
                //   <Text style={styles.quantityStyle}>{quantity}</Text>
                //   <TouchableOpacity onPress={handleIncrement}>
                //     <Icon
                //       color={COLORS.dgreen}
                //       size={20}
                //       source={'plus'}></Icon>
                //   </TouchableOpacity>
                // </View>
                <CustomButton
                  type={ButtonTypes.outline}
                  text="Edit"
                  style={styles.button}
                  textStyle={{color: COLORS.dgreen}}
                  onPress={() => {
                    onAddPress();
                  }}
                />
              ) : (
                <CustomButton
                  type={ButtonTypes.outline}
                  text="Add"
                  style={styles.button}
                  textStyle={{color: COLORS.dgreen}}
                  onPress={() => {
                    onAddPress();
                    handleAdd();
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </CardWrapper>
    </LinearGradient>
  );
};

export default SeriesCard;

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'relative',
    marginBottom: 3,
  },
  linearGradient: {
    height: 22,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
  },
  linearGradient2: {
    margin: 8,
    borderRadius: 8,
    // padding:-8
  },
  bodyStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    flex: 1,
    marginLeft: 10,
  },
  descriptionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skuStyle: {
    paddingTop: 6,
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.grey6,
  },
  price: {
    paddingTop: 8,
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '500',
  },
  skuIdStyle: {fontSize: 13, fontWeight: '500', color: COLORS.grey6},
  quantity: {
    color: COLORS.disabledGrey,
  },
  footerAction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {height: 40, width: 89, borderColor: COLORS.dgreen},
  stepperView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 40,
    width: 90,
    borderColor: COLORS.dgreen,
    borderWidth: 1,
    borderRadius: 4,
  },
  quantityStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.dgreen,
  },
});
