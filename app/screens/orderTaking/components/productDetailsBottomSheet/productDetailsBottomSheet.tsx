import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  formatNumberWithCommas,
  getTranslationLabel,
  heightToRatio,
  widthToRatio,
} from '@/utils/commonMethods';
import CommonStyles from '@/utils/commonStyle';
import {COLORS} from '@/theme/colors';
import Cross from '../../../../../assets/icons/crossIcon.svg';
import GreenBgMinus from '../../../../../assets/icons/greenBgMinus.svg';
import GreenBgPlus from '../../../../../assets/icons/greenBgPlus.svg';
import DropDown from '@/components/dropdown/Dropdown';
import OfferTag from '../../../../../assets/icons/offerTag.svg';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import {Divider, Icon, ProgressBar, Text} from 'react-native-paper';
import Spacer from '@/components/spacer';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {
  ISeriesCardProps,
  ProductList,
} from '@/screens/orderTaking/productSeries/productSeries';
import {uomList} from '@/utils/dummyData';
import {CurrencyCode, dot} from '@/utils/Constants';

interface IProductDetailsProps {
  onAddToCart: (
    existingQuantity: number,
    quantity: number,
    uomValue: string,
    existingUomValue: string,
    id: number,
  ) => void;
  onClose: () => void;
  selectedCardItem: ISeriesCardProps;
  productsAdded?: ProductList | undefined;
}

const ProductDetailsBottomSheet = ({
  onAddToCart,
  onClose,
  selectedCardItem,
  productsAdded,
}: IProductDetailsProps) => {
  const [isRecordTextVisible, setIsRecordTextVisible] =
    useState<boolean>(false);
  const [addedExistingStock, setAddedExistingStock] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [existingQuantity, setExistingQuantity] = useState(1);
  const [uomValue, setUomValue] = useState('');
  const [existingUomValue, setExistingUomValue] = useState('');
  const [showUomDropdown, setShowUomDropdown] = useState(false);
  const [showRecordUomDropdown, setShowRecordUomDropdown] = useState(false);

  const target = 7; // Set the target quantity to unlock discount //Change it during development

  // Calculate progress, ensuring it's between 0 and 1
  const progress = Math.min(quantity / target, 1);

  useEffect(() => {
    const product = productsAdded?.[selectedCardItem?.id];
    if (productsAdded?.[selectedCardItem.id]) {
      setQuantity(product?.quantity as unknown as number);
    }
  }, [productsAdded, selectedCardItem.id]);

  const handleIncrement = (item: string) => {
    item === 'quantity'
      ? setQuantity(quantity + 1)
      : setExistingQuantity(existingQuantity + 1);
  };
  const handleDecrement = (item: string) => {
    if (item === 'quantity') {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      } else {
        setQuantity(0);
      }
    } else {
      if (existingQuantity > 1) {
        setExistingQuantity(existingQuantity - 1);
      } else {
        setExistingQuantity(0);
      }
    }
  };

  const totalPrice = quantity * parseInt(selectedCardItem?.price ?? '0');

  return (
    <TouchableWithoutFeedback>
      <View style={CommonStyles.flexOne}>
        <BottomSheetScrollView bounces={false} style={styles.container}>
          <View style={styles.headingView}>
            <Text variant="bodyLarge" style={styles.heading}>
              {getTranslationLabel('product_detils')}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.crossView}>
              <Cross width={14} height={14} />
            </TouchableOpacity>
          </View>

          <Spacer size={16} />

          <View style={styles.imageContiner}>
            <Image
              source={require('../../../../../assets/images/pabbleWaterHeater.png')}
              style={styles.productImage}
            />
          </View>

          <Spacer size={16} />
          <View style={styles.headingView}>
            <View>
              <Text variant="bodyLarge" style={styles.productName}>
                {selectedCardItem?.name}
              </Text>
              <Text style={styles.skuText} variant="labelMedium">
                {getTranslationLabel('sku')}: {selectedCardItem?.sku}
                <Text style={styles.skuText}>
                  {' '}
                  {dot} {selectedCardItem?.avl}{' '}
                  {getTranslationLabel('available')}
                </Text>
              </Text>
            </View>

            <View style={styles.priceGreenView}>
              <Text variant="titleMedium" style={styles.priceText}>
                {CurrencyCode}
                {formatNumberWithCommas(
                  parseInt(selectedCardItem?.price ?? '0') ?? 0,
                )}
              </Text>
            </View>
          </View>

          <Spacer size={16} />
          <View style={styles.headingView}>
            <View>
              <Text variant="labelLarge" style={styles.quantityHeading}>
                {getTranslationLabel('quantity')}
              </Text>
              <Spacer size={6} />
              <View
                style={[
                  styles.addRemovequantView,
                  styles.headingView,
                  {
                    borderColor: isRecordTextVisible
                      ? COLORS.dividerGrey
                      : COLORS.dgreen,
                  },
                ]}>
                <GreenBgMinus
                  disabled={isRecordTextVisible}
                  color={
                    isRecordTextVisible ? COLORS.disabledGrey : COLORS.dgreen
                  }
                  onPress={() => handleDecrement('quantity')}
                />
                <Text
                  style={[
                    styles.quantityText,
                    {
                      color: isRecordTextVisible ? COLORS.grey6 : COLORS.black1,
                    },
                  ]}>
                  {quantity}
                </Text>
                <GreenBgPlus
                  disabled={isRecordTextVisible}
                  color={
                    isRecordTextVisible ? COLORS.disabledGrey : COLORS.dgreen
                  }
                  onPress={() => handleIncrement('quantity')}
                />
              </View>
            </View>

            <View style={styles.uomVIew}>
              <Text variant="labelLarge" style={styles.quantityHeading}>
                {getTranslationLabel('uom')}
              </Text>
              <Spacer size={6} />
              <View>
                <DropDown
                  value={uomValue}
                  list={uomList}
                  isDisabled={isRecordTextVisible}
                  setValue={data => {
                    setUomValue(data);
                  }}
                  label=""
                  visible={showUomDropdown}
                  onChangeDropdownState={() => {
                    setShowUomDropdown(!showUomDropdown);
                  }}
                  textInputStyle={styles.textInputStyle}
                  placeholder="UoM"
                />
              </View>
            </View>
          </View>

          <Spacer size={16} />
          <View style={styles.recordView}>
            <TouchableOpacity
              onPress={() => setIsRecordTextVisible(!isRecordTextVisible)}
              style={styles.recordText}>
              <Text variant="labelMedium" style={styles.toggleText}>
                {getTranslationLabel(
                  addedExistingStock ? 'current_stock' : 'record_exs_stock',
                )}
              </Text>
            </TouchableOpacity>
            <View>
              {!isRecordTextVisible && !addedExistingStock ? (
                <Icon source={'plus'} size={17} color={COLORS.dgreen} />
              ) : addedExistingStock && !isRecordTextVisible ? (
                <View style={CommonStyles.rowAlignCenter}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsRecordTextVisible(true);
                      setAddedExistingStock(false);
                    }}
                    style={styles.iconView}>
                    <Text style={{color: COLORS.dgreen}}>
                      {existingQuantity} Pieces
                    </Text>
                    <Icon
                      source={'pencil-outline'}
                      size={16}
                      color={COLORS.dgreen}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsRecordTextVisible(false);
                      setAddedExistingStock(false);
                      setExistingQuantity(1);
                    }}>
                    <Icon source={'delete-outline'} size={24} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setAddedExistingStock(true);
                    setIsRecordTextVisible(false);
                  }}
                  style={styles.doneView}>
                  <Text style={{color: COLORS.dgreen}} variant="labelMedium">
                    {getTranslationLabel('done')}
                  </Text>
                  <Icon source={'check'} size={17} color={COLORS.dgreen} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {isRecordTextVisible && (
            <>
              <Spacer size={16} />
              <View style={styles.headingView}>
                <View>
                  <Text variant="labelLarge" style={styles.quantityHeading}>
                    {getTranslationLabel('quantity')}
                  </Text>
                  <Spacer size={6} />
                  <View style={[styles.addRemovequantView, styles.headingView]}>
                    <GreenBgMinus
                      color={COLORS.dgreen}
                      onPress={() => handleDecrement('existing')}
                    />
                    <Text style={styles.quantityText}>{existingQuantity}</Text>
                    <GreenBgPlus
                      color={COLORS.dgreen}
                      onPress={() => handleIncrement('existing')}
                    />
                  </View>
                </View>

                <View style={styles.uomVIew}>
                  <Text variant="labelLarge" style={styles.quantityHeading}>
                    {getTranslationLabel('uom')}
                  </Text>
                  <Spacer size={6} />
                  <View>
                    <DropDown
                      value={existingUomValue}
                      list={uomList}
                      setValue={data => {
                        setExistingUomValue(data);
                      }}
                      label=""
                      visible={showRecordUomDropdown}
                      onChangeDropdownState={() => {
                        setShowRecordUomDropdown(!showRecordUomDropdown);
                      }}
                      textInputStyle={styles.textInputStyle}
                      placeholder="UoM"
                    />
                  </View>
                </View>
              </View>
            </>
          )}

          <Spacer size={25} />
          <View style={styles.headingView}>
            <OfferTag width={24} height={24} />
            <Text variant="bodyMedium" style={styles.offerTextLine}>
              Add 7 more to unlock 20% Off
            </Text>
          </View>
          <Spacer size={8} />
          <ProgressBar progress={progress} style={{borderRadius: 8}} />
        </BottomSheetScrollView>

        <Divider style={CommonStyles.horizontalDivider} />

        <View style={styles.orderAmountView}>
          <Text variant="titleMedium" style={styles.orderAmmountText}>
            {getTranslationLabel('order_amount')}{' '}
          </Text>
          <Text variant="titleMedium" style={styles.totalPrice}>
            {CurrencyCode} {formatNumberWithCommas(totalPrice)}
          </Text>
        </View>
        <Spacer size={18} />

        <CustomButton
          type={ButtonTypes.contained}
          text={getTranslationLabel('add_to_cart')}
          isDisabled={isRecordTextVisible}
          onPress={() => {
            onClose();
            onAddToCart(
              existingQuantity,
              quantity,
              uomValue,
              existingUomValue,
              selectedCardItem.id,
            );
          }}
          style={styles.button}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductDetailsBottomSheet;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  heading: {
    fontWeight: '700',
  },
  headingView: {
    ...CommonStyles.flexRow,
    alignItems: 'center',
  },
  crossView: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
  },
  imageContiner: {
    width: widthToRatio(312),
    height: heightToRatio(143),
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.greyText,
  },
  productImage: {
    width: widthToRatio(128),
    height: heightToRatio(128),
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  productName: {
    fontWeight: '700',
  },
  skuText: {
    color: COLORS.grey6,
  },
  priceGreenView: {
    backgroundColor: COLORS.backgroundDgreen,
    padding: 8,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  priceText: {
    textAlign: 'center',
    color: COLORS.black1,
  },
  addRemovequantView: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.dgreen,
    height: heightToRatio(37),
    paddingHorizontal: 8,
  },
  quantityText: {
    paddingHorizontal: 16,
  },
  quantityHeading: {
    color: COLORS.black1,
  },

  textInputStyle: {
    height: heightToRatio(37),
  },
  uomVIew: {
    marginLeft: 24,
    flex: 1,
  },
  toggleText: {
    color: COLORS.dgreen,
    lineHeight: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerTextLine: {
    color: COLORS.black,
    marginLeft: 8,
  },

  orderAmountView: {
    flexDirection: 'row',
    marginHorizontal: 18,
  },
  orderAmmountText: {
    color: COLORS.black1,
  },
  totalPrice: {
    color: COLORS.black1,
    marginLeft: 'auto',
  },
  recordView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recordText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconView: {
    borderWidth: 1,
    borderColor: COLORS.dgreen,
    flexDirection: 'row',
    gap: 5,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  doneView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  button: {marginHorizontal: 20, marginBottom: 20},
});
