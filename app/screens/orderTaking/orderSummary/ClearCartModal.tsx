import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {SetStateAction} from 'react';
import {Icon, Text} from 'react-native-paper';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import {COLORS} from '@/theme/colors';
import Spacer from '@/components/spacer';

interface CartModalProps {
  setShowModal: SetStateAction<any>;
  onClearPress: () => void;
}

const ClearCartModal = ({setShowModal, onClearPress}: CartModalProps) => {
  return (
    <View style={styles.cartWidth}>
      <Spacer size={12} />
      <TouchableOpacity onPress={() => setShowModal(false)} style={styles.icon}>
        <Icon color={COLORS.grey6} source={'close'} size={20} />
      </TouchableOpacity>
      <View style={styles.titleView}>
        <Text variant="titleMedium" style={styles.titleText}>
          Are you sure you want to clear your cart?
        </Text>
      </View>
      <Spacer size={16} />
      <View style={styles.buttonView}>
        <CustomButton
          text="Back"
          onPress={() => setShowModal(false)}
          type={ButtonTypes.outline}
          textStyle={{color: COLORS.dgreen}}
        />
        <CustomButton
          text="Clear"
          onPress={onClearPress}
          type={ButtonTypes.contained}
        />
      </View>
      <Spacer size={32} />
    </View>
  );
};

export default ClearCartModal;

const styles = StyleSheet.create({
  cartWidth: {
    width: 312,
  },
  icon: {
    display: 'flex',
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  titleText: {fontWeight: '700', textAlign: 'center'},
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
});
