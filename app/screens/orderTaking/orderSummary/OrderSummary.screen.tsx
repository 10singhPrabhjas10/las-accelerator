import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Layout from '@/components/Layout';
import CommonStyles from '@/utils/commonStyle';
import {Chip, Divider, Icon, Text} from 'react-native-paper';

import ClearCart from '../../../../assets/icons/clearCart.svg';
import {COLORS} from '@/theme/colors';
import {cartItems} from '@/utils/dummyData';
import SeriesCard from '../components/SeriesCard';

import {
  formatNumberWithCommas,
  getTranslationLabel,
} from '@/utils/commonMethods';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import ModalComponent from '@/modals/ModalComponent';
import ClearCartModal from './ClearCartModal';
import BottomSheetModalComponent from '@/bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import SchemesIcon from '../../../../assets/icons/schemesIcon.svg';
import EmptyCartIcon from '../../../../assets/icons/clearCart.svg';
import AdditionalSchemes from './additionalSchemes/AdditionalSchemes';
import Spacer from '@/components/spacer';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@/routes/RootNavigation';
import CompleteKycModal from '@/components/completeKycModal/CompleteKycModal';
import {DummyMobile} from '@/utils/Constants';

interface ISchemeProps {
  id: number;
  title: string;
  reason: string;
  description: string;
}

const cartItemsData = cartItems?.data;

const OrderSummary = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [showModal, setShowModal] = useState(false);
  const [showKYCModal, setShowKCModal] = useState<boolean>(false);
  const [schemesSelected, setSchemesSelected] = useState<ISchemeProps>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const totalQuantity = cartItems?.data?.reduce(
    (acc, currValue) => acc + currValue.itemQuantity,
    0,
  );

  const handleApplySchemes = (scheme: any) => {
    bottomSheetModalRef.current?.dismiss();
    setSchemesSelected(scheme);
  };

  return (
    <>
      <Layout
        headerTitle={getTranslationLabel('order_summary')}
        style={CommonStyles.padding}>
        {cartItemsData?.length > 0 ? (
          <>
            <View style={CommonStyles.flexOne}>
              <View style={styles.header}>
                <Text style={styles.titleWeight} variant="bodyLarge">
                  {getTranslationLabel('cart_items')} ({totalQuantity})
                </Text>
                <TouchableOpacity
                  onPress={() => setShowModal(true)}
                  style={styles.headerRight}>
                  <ClearCart width={16} height={16} color={COLORS.dgreen} />
                  <Text style={styles.clearCartText} variant="labelLarge">
                    {getTranslationLabel('clear_cart')}
                  </Text>
                </TouchableOpacity>
              </View>
              <Spacer size={16} />
              <FlatList
                data={cartItemsData}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <SeriesCard
                      itemQuantity={item.itemQuantity}
                      image={item.image}
                      onAddPress={() => {}}
                      price={item.price}
                      key={item.skuId}
                      seriesName={item.seriesName}
                      skuId={item.skuId}
                      skuName={item.skuName}
                      header={item.title?.length > 0}
                      title={item?.title}
                      onDeletePress={() => {}}
                    />
                  );
                }}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('OrderHome')}
                style={styles.addMoreProducts}>
                <Icon color={COLORS.dgreen} source={'plus'} size={20} />
                <Text style={{color: COLORS.dgreen}} variant="bodyLarge">
                  {getTranslationLabel('add_more_products')}
                </Text>
              </TouchableOpacity>
            </View>

            <ModalComponent
              showModal={showModal}
              setShowModal={() => setShowModal(!showModal)}>
              <ClearCartModal
                setShowModal={setShowModal}
                onClearPress={() => {}}
              />
            </ModalComponent>
          </>
        ) : (
          <View style={styles.emptyCartView}>
            <EmptyCartIcon />
            <Text style={{color: COLORS.black1}} variant="titleMedium">
              {getTranslationLabel('cart_empty')}
            </Text>
            <Text style={{color: COLORS.black1}} variant="bodyMedium">
              {getTranslationLabel('add_more_products')}
            </Text>
            <CustomButton
              onPress={() => {}}
              text={getTranslationLabel('add_products')}
              type={ButtonTypes.contained}
            />
          </View>
        )}
      </Layout>
      {cartItemsData?.length > 0 && (
        <>
          <View style={styles.footer}>
            <Spacer size={10} />
            <View style={styles.additionalSchemes}>
              <View
                style={[
                  styles.schemeView,
                  {flex: schemesSelected ? 1 : undefined},
                ]}>
                <SchemesIcon style={CommonStyles.flexOne} />
                {schemesSelected ? (
                  <View style={CommonStyles.flexOne}>
                    <Text style={{color: COLORS.greyText}}>
                      {schemesSelected?.title}
                    </Text>
                    <Text variant="titleMedium">{schemesSelected?.reason}</Text>
                  </View>
                ) : (
                  <Text variant="titleMedium">
                    {getTranslationLabel('view_additional_schemes')}
                  </Text>
                )}
              </View>
              {schemesSelected ? (
                <Chip
                  mode="outlined"
                  selectedColor={COLORS.dgreen}
                  style={{
                    backgroundColor: COLORS.appliedGreen,
                    borderWidth: 1,
                    borderColor: COLORS.dgreen,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClose={() => {
                    setSchemesSelected(undefined);
                  }}>
                  {getTranslationLabel('applied')}
                </Chip>
              ) : (
                <TouchableOpacity
                  onPress={() => bottomSheetModalRef.current?.present()}>
                  <Icon
                    color={COLORS.dgreen}
                    source={'chevron-right'}
                    size={24}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Divider style={CommonStyles.horizontalDivider} />
            <>
              <View style={styles.totalAmount}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text variant="titleMedium">
                    {getTranslationLabel('total_amount')} *
                  </Text>
                  <Text variant="titleMedium">
                    ₹{formatNumberWithCommas(200973)}
                  </Text>
                </View>
                <Spacer size={10} />
                {schemesSelected && (
                  <>
                    <Text
                      style={{fontSize: 11, lineHeight: 12, fontWeight: '400'}}>
                      {getTranslationLabel('total_amount_indicative')}
                    </Text>
                    <Spacer size={6} />
                    <Text
                      style={{fontSize: 11, lineHeight: 12, fontWeight: '400'}}>
                      {getTranslationLabel('estimated_delivery')}
                    </Text>
                  </>
                )}
              </View>
              <Spacer size={16} />
              <CustomButton
                text={getTranslationLabel('get_otp_confirm_order')}
                onPress={() => {
                  navigation.navigate('OrderConfirmation', {
                    mobileNumber: DummyMobile,
                  });
                  //  setShowKCModal(true);
                }}
                type={ButtonTypes.contained}
              />
              <Spacer size={16} />
            </>
          </View>
          <BottomSheetModalComponent
            maxHeight={'75%'}
            minHeight={'75%'}
            ref={bottomSheetModalRef}>
            <AdditionalSchemes
              onClose={() => bottomSheetModalRef.current?.dismiss()}
              onApplySchemes={handleApplySchemes}
            />
          </BottomSheetModalComponent>
        </>
      )}
      <CompleteKycModal
        showModal={showKYCModal}
        setShowModal={setShowKCModal}
      />
    </>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWeight: {fontWeight: '700'},
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clearCartText: {marginLeft: 5, color: COLORS.dgreen},
  addMoreProducts: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  emptyCartView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  footer: {backgroundColor: COLORS.white, paddingHorizontal: 20},
  additionalSchemes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  schemeView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'space-between',
  },
  totalAmount: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
});
