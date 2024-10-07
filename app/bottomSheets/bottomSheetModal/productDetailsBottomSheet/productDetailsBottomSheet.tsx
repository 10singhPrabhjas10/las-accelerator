import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import BottomSheetModalComponent from '../BottomSheetModalComponent';
import {
  getTranslationLabel,
  heightToRatio,
  widthToRatio,
} from '@/utils/commonMethods';
import CommonStyles from '@/utils/commonStyle';
import {fontConfig} from '@/theme/fonts';
import {COLORS} from '@/theme/colors';
import Cross from '../../../../assets/icons/cross.svg';
import GreenBgMinus from '../../../../assets/icons/greenBgMinus.svg';
import GreenBgPlus from '../../../../assets/icons/greenBgPlus.svg';
import DropDown from '@/components/dropdown/Dropdown';
import OfferTag from '../../../../assets/icons/offerTag.svg';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
const ProductDetailsBottomSheet = ({sheetRef}) => {
  const [isRecordTextVisible, setIsRecordTextVisible] = useState(false);
  return (
    <BottomSheetModalComponent
      maxHeight={'80%'}
      minHeight={'75%'}
      ref={sheetRef}>
      <View style={styles.container}>
        <View style={styles.headingView}>
          <Text style={styles.heading}>
            {getTranslationLabel('product_detils')}
          </Text>
          <TouchableOpacity style={styles.crossView}>
            <Cross width={26} height={26} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContiner}>
          <Image
            source={require('../../../../assets/images/pabbleWaterHeater.png')}
            style={styles.productImage}
          />
        </View>
        <View style={styles.headingView}>
          <View>
            <Text style={styles.productName}>Aqua Water Heater</Text>
            <Text>SKU: 144689 450 available</Text>
          </View>
          <View style={styles.priceGreenView}>
            <Text style={styles.priceText}>₹8,999</Text>
          </View>
        </View>

        <View style={styles.headingView}>
          <View>
            <Text style={styles.quantityHeading}>Quantity</Text>
            <View style={[styles.addRemovequantView, styles.headingView]}>
              <GreenBgMinus />
              <Text style={styles.quantityText}>1</Text>
              <GreenBgPlus />
            </View>
          </View>
          <View style={styles.uomVIew}>
            <Text style={styles.quantityHeading}>UoM</Text>
            <View style={styles.dropDownStyle}>
              <DropDown
                value={'Peices.'}
                list={[
                  {value: '1', label: 'Peices'},
                  {value: '2', label: 'Boxes'},
                ]}
                // updateDisplayValue={value => value}
                visible={false}
                onChangeDropdownState={() => {}}
                setValue={data => {}}
              />
            </View>
          </View>
        </View>
        <Text
          style={styles.toggleText}
          onPress={() => setIsRecordTextVisible(!isRecordTextVisible)}>
          Record existing stock
        </Text>

        {isRecordTextVisible && (
          <View style={styles.headingView}>
            <View>
              <Text style={styles.quantityHeading}>Quantity</Text>
              <View style={[styles.addRemovequantView, styles.headingView]}>
                <GreenBgMinus />
                <Text style={styles.quantityText}>1</Text>
                <GreenBgPlus />
              </View>
            </View>
            <View style={styles.uomVIew}>
              <Text style={styles.quantityHeading}>UoM</Text>
              <View style={styles.dropDownStyle}>
                <DropDown
                  value={'Peices.'}
                  list={[
                    {value: '1', label: 'Peices'},
                    {value: '2', label: 'Boxes'},
                  ]}
                  // updateDisplayValue={value => value}
                  visible={false}
                  onChangeDropdownState={() => {}}
                  setValue={data => {}}
                />
              </View>
            </View>
          </View>
        )}

        <View style={[styles.headingView, styles.offerview]}>
          <OfferTag />
          <Text style={styles.offerTextLine}>Add 7 more to unlock 20% Off</Text>
        </View>
        <View style={(styles.headingView, styles.greenInserts)}>
          <View style={styles.darkGreenUpdates}></View>
        </View>
      </View>
      <View style={styles.seperator} />
      <View style={styles.orderAmountView}>
        <Text style={styles.orderAmmountText}>Order Amount </Text>
        <Text style={styles.totalPrice}>₹89990</Text>
      </View>

      <View style={styles.lastBtn}>
        <CustomButton
          type={ButtonTypes.contained}
          style={styles.button}
          text={'Add to Cart'}
          onPress={() => {}}
        />
      </View>
    </BottomSheetModalComponent>
  );
};

export default ProductDetailsBottomSheet;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  heading: {
    ...fontConfig.headlineMedium,
    fontSize: 16,
    color: COLORS.black,
  },
  headingView: {
    ...CommonStyles.flexRow,
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
    marginTop: 8,
  },
  productImage: {
    width: 200,
    height: 143,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  productName: {
    ...fontConfig.headlineMedium,
    fontSize: 16,
    color: COLORS.black,
  },
  priceText: {
    ...fontConfig.titleLarge,
    color: COLORS.dgreen,
  },
  priceGreenView: {
    backgroundColor: COLORS.kellyGreen,
    width: widthToRatio(70),
    height: heightToRatio(32),
    padding: 6,
    borderRadius: 8,
    marginLeft: 'auto',
    marginTop: 8,
  },
  addRemovequantView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.dgreen,
    padding: 8,
  },
  quantityText: {
    paddingHorizontal: 16,
  },
  quantityHeading: {
    color: COLORS.black,
    marginVertical: 4,
  },
  dropDownStyle: {
    position: 'relative',
    top: heightToRatio(-20),
    height: heightToRatio(36),
  },
  uomVIew: {
    marginLeft: 24,
  },
  toggleText: {
    color: COLORS.green,
    marginTop: 6,
  },
  offerTextLine: {
    color: COLORS.black,
    marginLeft: 6,
  },
  offerview: {
    marginTop: 16,
  },
  greenInserts: {
    width: '100%',
    backgroundColor: COLORS.lightGreen,
    height: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  darkGreenUpdates: {
    width: '20%',
    zIndex: 1000,
    backgroundColor: COLORS.dgreen,
    height: 4,
    borderRadius: 8,
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.borderGray,
    marginTop: 16,
  },
  orderAmountView: {
    flexDirection: 'row',
    margin: 16,
  },
  orderAmmountText: {
    ...fontConfig.bodyLarge,
    color: COLORS.black,
  },
  totalPrice: {
    ...fontConfig.bodyLarge,
    color: COLORS.black,
    marginLeft: 'auto',
  },
  lastBtn: {
    margin: 16,
    marginTop:0
  },
});
