import CustomButton from '@/components/button/CustomButton';
import ModalComponent from '@/modals/ModalComponent';
import {COLORS} from '@/theme/colors';
import {ButtonTypes} from '@/types/buttons';
import {
  getDeviceWidth,
  getTranslationLabel,
  widthToRatio,
} from '@/utils/commonMethods';
import CommonStyles from '@/utils/commonStyle';
import React from 'react';
import {StyleSheet, Vibration, View} from 'react-native';
import {Text} from 'react-native-paper';
import {he} from 'react-native-paper-dates';
import Icon from 'react-native-vector-icons/Entypo';

import Icon2 from 'react-native-vector-icons/AntDesign';
interface IOrderConfirmedModal {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
}
const OrderConfirmedModal = ({
  setShowModal,
  showModal = true,
}: IOrderConfirmedModal) => {
  console.log(showModal, 'showModal');
  return (
    <ModalComponent showModal={showModal}>
      <View style={styles.parent}>
        <Icon
          size={20}
          name="cross"
          onPress={() => setShowModal(false)}
          style={{alignSelf: 'flex-end'}}
        />
        <Icon2
          name="checkcircle"
          color={COLORS.dgreen}
          size={32}
          style={{alignSelf: 'center'}}
        />

        <Text
          variant="headlineSmall"
          style={[CommonStyles.marginVertical16, {textAlign: 'center'}]}>
          {getTranslationLabel('OrderHasBeenPlacedSuccessfully')}
        </Text>
        <Text
          numberOfLines={2}
          style={[CommonStyles.marginVertical10, {textAlign: 'center'}]}>
          {getTranslationLabel('YouMayShareOrderSummary')}
        </Text>
        <CustomButton
          type={ButtonTypes.contained}
          text={'Share Order Summary'}
          icon={<Icon name="share" size={14} color={COLORS.white} />}
          onPress={function (): void {
            //  throw new Error('Function not implemented.');
          }}
        />
      </View>
    </ModalComponent>
  );
};
const styles = StyleSheet.create({
  parent: {
    width: getDeviceWidth(0.9),
    padding: '10%',
  },
});
export default OrderConfirmedModal;
