//External dependencies
import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text, TextInput} from 'react-native-paper';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

//Internal dependencies
import Layout from 'components/Layout';
// import ContactFooter from 'components/contactFooter/ContactFooter';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {AuthNavigationTypes} from 'routes/AuthNavigator';
import {handleVerifyOtp} from '../Auth.business';
import CustomButton from 'components/button/CustomButton';
import ScreenHeader from 'components/headers/ScreenHeader';
import {AuthNavigationProp} from 'routes/AuthNavigator';

//Styles, Constants and interfaces
import {COLORS} from 'theme/colors';
import styles from './OtpVerification.style';
import {getTranslationLabel, secondsToMinutes} from 'utils/commonMethods';
import WarningSvg from './../../../../assets/icons/warning-circle.svg';
import {ButtonTypes} from 'types/buttons';
// import CardWrapper from '@/components/card/Card';
import HelpCard from '@/components/helpCard/HelpCard';
import DialPad from '../../../../assets/icons/dialpad.svg';
import CheckCircle from '../../../../assets/icons/check_circle.svg';
import ModalComponent from '@/modals/ModalComponent';
import CloseIcon from '../../../../assets/icons/closeIcon.svg';
import ErrorIcon from '../../../../assets/icons/error.svg';
import EmailIcon from '../../../../assets/icons/email.svg';
import PhoneIcon from '../../../../assets/icons/phone.svg';
import CommonStyles from '@/utils/commonStyle';
import SubHeader from '@/components/subHeader/subHeader';
import {DummyMobile} from '@/utils/Constants';
import OtpCard from '@/components/otpVerification';
const OtpVerification = () => {
  const route = useRoute<RouteProp<AuthNavigationTypes, 'OtpVerification'>>();
  const otpTimer = 60; // route.params?.resendBlockDurationSeconds;
  const bannerTime = 5;
  const [otp, setOtp] = useState<string>('');
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

  // const textTheme = {colors: {onSurface: COLORS.grey4}};
  // const resendOtpTheme = {colors: {onSurface: COLORS.blue}};

  // const resendOtpLabel = getTranslationLabel('resend_otp');
  // const resendOtpInLabel = getTranslationLabel('resend_otp_in');

  const warningIcon = () => <WarningSvg height={20} width={20} />;

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

  const ResendOTP = () => {
    if (otpAttempts >= 5) {
      setShowModal(true);
      return;
    }
    setResendTimerBanner(bannerTime);
    setResendOtpTimer(otpTimer);
    setOTPattempts(attempts => attempts + 1);
  };

  const verifyOtpHandler = async (): Promise<void> => {
    try {
      if (otp.length < 6) {
        setErrorMsg(getTranslationLabel('invalid_please_try_again'));
        return;
      }

      await handleVerifyOtp(
        mobileNumber,
        otp,
        setIsLoading,
        setErrorMsg,
        setOtp,
      );
      navigation.navigate('attendance', {title: 'Dummy User'});
    } catch (err) {
      console.log(err);
    }
  };

  const BackButton = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
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
    <Layout isScrollable>
      <ScreenHeader showScreenName={false} />
      <View style={[CommonStyles.rowSpaceBetweenFlex]}>
        <View style={CommonStyles.flexOne}>
          <SubHeader shouldShowCardView={false}>
            <OtpCard style={{marginTop: '-35%'}} setOtp={setOtp} otp={otp} />
          </SubHeader>
          <View
            style={[CommonStyles.marginHorizontal24, CommonStyles.marginTop]}>
            <HelpCard />
          </View>
        </View>
        <View style={styles.ButtonContainer}>
          <CustomButton
            style={styles.BackButton}
            type={ButtonTypes.outline}
            text={getTranslationLabel('back')}
            onPress={BackButton}
            textStyle={styles.BackTextStyle}
          />
          <CustomButton
            style={styles.BackButton}
            isDisabled={otp.trim().length < 6}
            type={ButtonTypes.contained}
            text={getTranslationLabel('submit')}
            onPress={verifyOtpHandler}
            textStyle={(!(otp.trim().length < 6) && styles.OTPtextStyle) || {}}
          />
        </View>
      </View>
    </Layout>
  );
};

export default OtpVerification;

/////----------------------OLD SCREEN --------------------------------------------------
// //External dependencies
// import {Image, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {Text, TextInput} from 'react-native-paper';
// import {RouteProp, useRoute} from '@react-navigation/native';

// //Internal dependencies
// import Layout from 'components/Layout';
// import ContactFooter from 'components/contactFooter/ContactFooter';
// import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
// import {AuthNavigationTypes} from 'routes/AuthNavigator';
// import {handleResendOtp, handleVerifyOtp} from '../Auth.business';
// import CustomButton from 'components/button/CustomButton';
// import ScreenHeader from 'components/headers/ScreenHeader';

// //Styles, Constants and interfaces
// import {COLORS} from 'theme/colors';
// import styles from './OtpVerification.style';
// import {getTranslationLabel, secondsToMinutes} from 'utils/commonMethods';
// import WarningSvg from './../../../../assets/icons/warning-circle.svg';
// import {ButtonTypes} from 'types/buttons';

// const OtpVerification = () => {
//   const route = useRoute<RouteProp<AuthNavigationTypes, 'OtpVerification'>>();
//   const otpTimer = route.params?.resendBlockDurationSeconds;
//   const [otp, setOtp] = useState<string>('');
//   const [errorMsg, setErrorMsg] = useState<string>('');
//   const [resendOtpTimer, setResendOtpTimer] = useState<number>(otpTimer);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const mobileNumber = route.params?.mobileNumber;

//   const textTheme = {colors: {onSurface: COLORS.grey4}};
//   const resendOtpTheme = {colors: {onSurface: COLORS.blue}};

//   const resendOtpLabel = getTranslationLabel('resend_otp');
//   const resendOtpInLabel = getTranslationLabel('resend_otp_in');

//   const warningIcon = () => <WarningSvg height={20} width={20} />;

//   useEffect(() => {
//     let interval = setInterval(() => {
//       if (resendOtpTimer > 0) {
//         setResendOtpTimer(resendOtpTimer - 1);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [resendOtpTimer]);

//   return (
//     <Layout isScrollable hideStatusBar>
//       {/* <Image
//         source={require('../../../../assets/images/loginHeader.png')}
//         style={styles.imageHeader}
//       /> */}
//       <ScreenHeader showScreenName={false} />
//       <View style={styles.imageHeader} />
//       <View style={styles.bodyContainer}>
//         <Text variant="headlineSmall">{getTranslationLabel('otp_verify')}</Text>
//         <Text variant="bodyMedium" theme={textTheme} style={styles.otpTitle}>
//           {getTranslationLabel('otp_sent_successfully')}
//         </Text>
//         <PrimaryTextInput
//           titleText={getTranslationLabel('mobile_number')}
//           isRequired={false}
//           value={mobileNumber}
//           disabled
//           keyboardType="numeric"
//           maxLength={10}
//           left={mobileNumber && <TextInput.Affix text="+91 |" />}
//           onChangeText={() => {}}
//           containerStyle={styles.textInputContainer}
//         />
//         <PrimaryTextInput
//           placeHolder={getTranslationLabel('enter_the_code_here')}
//           titleText={getTranslationLabel('enter_otp')}
//           isRequired={false}
//           value={otp}
//           keyboardType="numeric"
//           returnKeyType="done"
//           maxLength={6}
//           onChangeText={val => setOtp(val)}
//           containerStyle={styles.textInputContainer}
//           error={errorMsg.length !== 0}
//           errorText={errorMsg}
//           right={
//             errorMsg.length !== 0 ? <TextInput.Icon icon={warningIcon} /> : null
//           }
//         />
//         <Text variant="bodyMedium" theme={textTheme} style={styles.resendOtp}>
//           {getTranslationLabel('didnt_receive_otp?')}{' '}
//           <Text
//             theme={resendOtpTheme}
//             disabled={resendOtpTimer > 0}
//             onPress={() => {
//               setOtp('');
//               handleResendOtp(mobileNumber, () => {
//                 setResendOtpTimer(otpTimer);
//               });
//             }}>
//             {resendOtpTimer > 0
//               ? `${resendOtpInLabel} ${secondsToMinutes(resendOtpTimer)}`
//               : resendOtpLabel}
//           </Text>
//         </Text>
//       </View>
//       <CustomButton
//         type={ButtonTypes.contained}
//         style={styles.button}
//         text={getTranslationLabel('verify')}
//         loading={isLoading}
//         isDisabled={isLoading || otp.length !== 6}
//         onPress={() =>
//           handleVerifyOtp(mobileNumber, otp, setIsLoading, setErrorMsg, setOtp)
//         }
//       />
//       <ContactFooter />
//     </Layout>
//   );
// };

// export default OtpVerification;
