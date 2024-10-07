import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import BottomSheetModalComponent from '../BottomSheetModalComponent';
import {
  formatNumberWithCommas,
  getTranslationLabel,
  heightToRatio,
  widthToRatio,
} from '@/utils/commonMethods';
import CommonStyles from '@/utils/commonStyle';
import {COLORS} from '@/theme/colors';
import Cross from '../../../../assets/icons/crossIcon.svg';
import GreenBgMinus from '../../../../assets/icons/greenBgMinus.svg';
import GreenBgPlus from '../../../../assets/icons/greenBgPlus.svg';
import DropDown from '@/components/dropdown/Dropdown';
import OfferTag from '../../../../assets/icons/offerTag.svg';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import {Divider, Icon, ProgressBar, Text} from 'react-native-paper';
import Spacer from '@/components/spacer';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {ISeriesCardProps} from '@/screens/productSeries/productSeries';

interface IProductDetailsProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
  selectedCardItem: ISeriesCardProps | null;
}

const uomList = [
  {value: '1', label: 'Peices'},
  {value: '2', label: 'Boxes'},
];

const ProductDetailsBottomSheet = ({
  sheetRef,
  onClose,
  selectedCardItem,
}: IProductDetailsProps) => {
  const [isRecordTextVisible, setIsRecordTextVisible] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [uomValue, setUomValue] = useState('');
  const [showUomDropdown, setShowUomDropdown] = useState(false);
  const [showRecordUomDropdown, setShowRecordUomDropdown] = useState(false);

  const target = 7; // Set the target quantity to unlock discount //Change it during development

  // Calculate progress, ensuring it's between 0 and 1
  const progress = Math.min(quantity / target, 1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  };

  const totalPrice = quantity * parseInt(selectedCardItem?.price ?? '0');

  return (
    <BottomSheetModalComponent
      maxHeight={'80%'}
      minHeight={'75%'}
      ref={sheetRef}>
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
            source={require('../../../../assets/images/pabbleWaterHeater.png')}
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
              SKU: {selectedCardItem?.sku}
              <Text style={styles.skuText}>
                {' '}
                • {selectedCardItem?.avl} available
              </Text>
            </Text>
          </View>

          <View style={styles.priceGreenView}>
            <Text variant="titleMedium" style={styles.priceText}>
              ₹{' '}
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
              Quantity
            </Text>
            <Spacer size={6} />
            <View style={[styles.addRemovequantView, styles.headingView]}>
              <GreenBgMinus onPress={handleDecrement} />
              <Text style={styles.quantityText}>{quantity}</Text>
              <GreenBgPlus onPress={handleIncrement} />
            </View>
          </View>

          <View style={styles.uomVIew}>
            <Text variant="labelLarge" style={styles.quantityHeading}>
              UoM
            </Text>
            <Spacer size={6} />
            <View>
              <DropDown
                value={uomValue}
                list={uomList}
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
        <TouchableOpacity
          onPress={() => setIsRecordTextVisible(!isRecordTextVisible)}
          style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Text variant="labelMedium" style={styles.toggleText}>
            Record existing stock
          </Text>
          <Icon
            source={!isRecordTextVisible ? 'chevron-down' : 'chevron-up'}
            size={17}
            color={COLORS.dgreen}
          />
        </TouchableOpacity>

        {isRecordTextVisible && (
          <>
            <Spacer size={16} />
            <View style={styles.headingView}>
              <View>
                <Text variant="labelLarge" style={styles.quantityHeading}>
                  Quantity
                </Text>
                <Spacer size={6} />
                <View style={[styles.addRemovequantView, styles.headingView]}>
                  <GreenBgMinus onPress={handleDecrement} />
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <GreenBgPlus onPress={handleIncrement} />
                </View>
              </View>

              <View style={styles.uomVIew}>
                <Text variant="labelLarge" style={styles.quantityHeading}>
                  UoM
                </Text>
                <Spacer size={6} />
                <View>
                  <DropDown
                    value={uomValue}
                    list={uomList}
                    setValue={data => {
                      setUomValue(data);
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
          Order Amount{' '}
        </Text>
        <Text variant="titleMedium" style={styles.totalPrice}>
          ₹ {formatNumberWithCommas(totalPrice)}
        </Text>
      </View>
      <Spacer size={18} />

      <CustomButton
        type={ButtonTypes.contained}
        text={'Add to Cart'}
        onPress={onClose}
        style={styles.button}
      />
    </BottomSheetModalComponent>
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

  darkGreenUpdates: {
    width: '20%',
    zIndex: 1000,
    backgroundColor: COLORS.dgreen,
    height: 4,
    borderRadius: 8,
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
  button: {marginHorizontal: 20, marginBottom: 20},
});
