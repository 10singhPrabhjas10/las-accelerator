import React, {useEffect, useState} from 'react';
import {Card, Text, TextInput} from 'react-native-paper';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProp, AuthNavigationTypes} from '@/routes/AuthNavigator';
import {RouteProp, useRoute} from '@react-navigation/native';
import {getTranslationLabel} from '@/utils/commonMethods';
////SVG
import DialPad from '../../../assets/icons/dialpad.svg';
import CheckCircle from '../../../assets/icons/check_circle.svg';
import CloseIcon from '../../../assets/icons/closeIcon.svg';
import ErrorIcon from '../../../assets/icons/error.svg';
import EmailIcon from '../../../assets/icons/email.svg';
import PhoneIcon from '../../../assets/icons/phone.svg';
///
import PrimaryTextInput from '../textInput/PrimaryTextInput';
import WarningSvg from '../../../assets/icons/warning-circle.svg';
import {COLORS} from '../../theme/colors';
import {secondsToMinutes} from '@/utils/commonMethods';
import ModalComponent from '@/modals/ModalComponent';
import CommonStyles from '@/utils/commonStyle';
import {DummyMobile} from '@/utils/Constants';
interface IOtpCard {
  otp: string;
  setOtp: Function;
}
const OtpCard = ({otp = '', setOtp = () => {}}: IOtpCard) => {
  const route = useRoute<RouteProp<AuthNavigationTypes, 'OtpVerification'>>();
  const otpTimer = 60; // route.params?.resendBlockDurationSeconds;
  const bannerTime = 5;
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [resendOtpTimer, setResendOtpTimer] = useState<number>(otpTimer);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpAttempts, setOTPattempts] = useState<number>(0);
  // const [otpDisabled, setOtpDisabled] = useState<boolean>(false);
  const [resendBannerTimmer, setResendTimerBanner] =
    useState<number>(bannerTime);
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigation = useNavigation<AuthNavigationProp>();

  const mobileNumber = route.params?.mobileNumber;
  useEffect(() => {
    let interval = setInterval(() => {
      if (resendOtpTimer > 0) {
        setResendOtpTimer(resendOtpTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resendOtpTimer]);

  useEffect(() => {
    let interval = setInterval(() => {
      if (resendBannerTimmer > 0) {
        setResendTimerBanner(resendBannerTimmer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resendBannerTimmer]);

  const warningIcon = () => <WarningSvg height={20} width={20} />;
  const ResendOTP = () => {
    if (otpAttempts >= 5) {
      setShowModal(true);
      return;
    }
    setResendTimerBanner(bannerTime);
    setResendOtpTimer(otpTimer);
    setOTPattempts(attempts => attempts + 1);
  };

  const renderModal = (
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    return (
      <ModalComponent showModal={showModal}>
        <View style={styles.modalTopContainer}>
          <TouchableOpacity onPress={() => setShowModal(!showModal)}>
            <CloseIcon width={16} height={16} />
          </TouchableOpacity>
        </View>
        <View style={styles.modalcontainerBottom}>
          <ErrorIcon />
          <View style={CommonStyles.padding10} />
          <Text variant="headlineSmall">
            {getTranslationLabel('otp_attempts_exhausted')}
          </Text>
          <View style={styles.helpTextContainer} />
          <Text variant="titleMedium">
            {getTranslationLabel('get_in_touch_with_support')}
          </Text>
          <View style={[styles.contactGroup, styles.marginTop]}>
            <PhoneIcon />
            <Text variant="titleMedium" style={styles.greenText}>
              {DummyMobile}
            </Text>
          </View>
          <View style={CommonStyles.padding10} />
          <View style={styles.contactGroup}>
            <EmailIcon width={24} height={24} />
            <Text variant="titleMedium" style={styles.greenText}>
              info@deloitte.com
            </Text>
          </View>
          <View style={CommonStyles.padding10} />
        </View>
      </ModalComponent>
    );
  };

  return (
    <Card style={styles.card}>
      <View style={styles.bodyContainer}>
        <View style={styles.group}>
          <View style={styles.IconContainer}>
            {!resendBannerTimmer ? (
              <DialPad />
            ) : (
              <View style={styles.OTPbanner}>
                <CheckCircle />
                <Text variant="titleSmall" style={styles.OTPBannerText}>
                  {getTranslationLabel('otp_sent_to')} {mobileNumber}
                </Text>
              </View>
            )}
          </View>

          <Text variant="headlineSmall">
            {getTranslationLabel('verification')}
          </Text>
        </View>

        <PrimaryTextInput
          placeHolder={getTranslationLabel('six_digits')}
          titleText={getTranslationLabel('enter_otp')}
          isRequired={false}
          value={otp}
          keyboardType="numeric"
          returnKeyType="done"
          maxLength={6}
          ThemeColors={{primary: COLORS.dgreen}}
          onChangeText={val => setOtp(val)}
          containerStyle={styles.textInputContainer}
          error={errorMsg.length !== 0}
          errorText={errorMsg}
          right={
            errorMsg.length !== 0 ? <TextInput.Icon icon={warningIcon} /> : null
          }
        />
        <View style={styles.resendContainer}>
          <Text
            onPress={!resendOtpTimer ? ResendOTP : () => {}}
            style={!resendOtpTimer ? styles.ResendOTP : {}}
            variant="labelMedium">
            {getTranslationLabel('resend_otp')} {`(${otpAttempts}/5)`}
          </Text>

          {resendOtpTimer ? (
            <Text variant="labelMedium" style={styles.ResendOTP}>
              {getTranslationLabel('resend_otp_in_')}{' '}
              {secondsToMinutes(resendOtpTimer)}
            </Text>
          ) : (
            <Text variant="labelMedium" style={styles.ResendOTPDisabled}>
              {getTranslationLabel('resend_otp_in_') + ' 1:00'}
            </Text>
          )}
        </View>
      </View>
      {renderModal(showModal, setShowModal)}
    </Card>
  );
};
export default OtpCard;
