import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  callNumber,
  getTranslationLabel,
  heightToRatio,
  sendMail,
  widthToRatio,
} from '@/utils/commonMethods';
import CommonStyles from '@/utils/commonStyle';
import SvgClose from '@/../assets/icons/closeIcon.svg';
import SvgCall from '@/../assets/icons/callIcon.svg';
import SvgEmail from '@/../assets/icons/email.svg';
import Error from '@/../assets/icons/error.svg';

import ModalComponent from '@/modals/ModalComponent';
import {COLORS} from '@/theme/colors';
import Spacer from 'components/spacer';
import CustomButton from '../button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import {fontConfig} from '@/theme/fonts';

const CompleteKycModal = () => {
  const [showModal, setShowModal] = useState<boolean>(true);

  return (
    <ModalComponent showModal={showModal}>
      <View style={styles.modalTopContainer}>
        <TouchableOpacity
          onPress={() => setShowModal(!showModal)}
          style={CommonStyles.selfFlexEnd}>
          <SvgClose width={16} height={16} />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Error />
          <Text style={styles.modalHeading}>
            {getTranslationLabel('retailer_KYC_Pending')}
          </Text>
          <CustomButton
            style={styles.kycButton}
            type={ButtonTypes.contained}
            text={'Save Order & Go Home'}
            onPress={() => {}}
            textStyle={styles.kycBtntextStyle}
          />
          <View style={styles.divider} />
          <Text style={styles.modalSubHeading}>
            {getTranslationLabel('profile-modal-subHeading')}
          </Text>
          <View style={styles.contactContainer}>
            <TouchableOpacity
              onPress={() => {
                callNumber(getTranslationLabel('profile-modal-contact'));
              }}
              style={[CommonStyles.flexRow, CommonStyles.center]}>
              <SvgCall width={heightToRatio(18)} height={heightToRatio(18)} />
              <Text style={styles.modalContact}>
                {getTranslationLabel('profile-modal-contact')}
              </Text>
            </TouchableOpacity>
            <Spacer size={20} />
            <TouchableOpacity
              onPress={() => {
                sendMail(getTranslationLabel('profile-modal-email'));
              }}
              style={[CommonStyles.flexRow, CommonStyles.center]}>
              <SvgEmail width={heightToRatio(18)} height={heightToRatio(18)} />
              <Text style={styles.modalContact}>
                {getTranslationLabel('profile-modal-email')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ModalComponent>
  );
};

export default CompleteKycModal;

const styles = StyleSheet.create({
  modalTopContainer: {
    // height: heightToRatio(237),
    width: widthToRatio(312),
    paddingHorizontal: widthToRatio(12),
    paddingVertical: heightToRatio(12),
  },
  modalSubHeading: {
    fontWeight: '500',
    fontSize: heightToRatio(14),
    lineHeight: heightToRatio(17.5),
    color: COLORS.grey500,
  },
  modalHeading: {
    fontWeight: '700',
    fontSize: heightToRatio(20),
    lineHeight: heightToRatio(25),
    color: COLORS.grey500,
    marginVertical: 16,
  },
  divider: {
    width: '100%',
    height: heightToRatio(1),
    backgroundColor: COLORS.dividerGrey,
    marginVertical: heightToRatio(12),
  },
  contactContainer: {
    marginTop: heightToRatio(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContact: {
    color: COLORS.green,
    fontWeight: '400',
    fontSize: heightToRatio(14),
    lineHeight: heightToRatio(21),
    marginLeft: widthToRatio(6),
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
  },
  kycButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: heightToRatio(32),
  },
  kycBtntextStyle: {
    height: 46,
    ...fontConfig.labelMedium,
    color: COLORS.white,
  },
});
