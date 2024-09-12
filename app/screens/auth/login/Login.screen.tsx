//External dependencies
import React, {useEffect, useState} from 'react';
import {Image, View, KeyboardAvoidingView} from 'react-native';
import {Checkbox, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CallIcon from '../../../../assets/icons/call.svg';
//Internal dependencies
import Layout from 'components/Layout';
import ContactFooter from 'components/contactFooter/ContactFooter';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {AuthNavigationProp} from 'routes/AuthNavigator';
import {handleGetOtp} from '../Auth.business';
import CustomButton from 'components/button/CustomButton';
import ScreenHeader from 'components/headers/ScreenHeader';
import PhoneInput from '@/components/phoneInput/PhoneInput';

//Styles, Constants and interfaces
import styles from './Login.style';
import {COLORS} from 'theme/colors';
import {
  getDeviceHeight,
  getTranslationDynamicLabel,
  getTranslationLabel,
  isMobileNumberValid,
} from 'utils/commonMethods';
import WarningSvg from './../../../../assets/icons/warning-circle.svg';
import {ButtonTypes} from 'types/buttons';
import CardWrapper from '@/components/card/Card';
import HelpCard from '@/components/helpCard/HelpCard';
import Icon from 'react-native-vector-icons/AntDesign';
import CommonStyles from '@/utils/commonStyle';
import SubHeader from '@/components/subHeader/subHeader';

//-------NEW-DESIGNS------------------------------------------------\\
const Login = () => {
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpDisabled, setOtpDisabled] = useState<boolean>(false);
  const [CountryCode, setCountryCode] = useState<string>('+91');
  const navigation = useNavigation<AuthNavigationProp>();

  useEffect(() => {
    if (isMobileNumberValid(mobileNumber)) {
      setErrorMsg(getTranslationLabel('invalid_mobile_number'));
    } else {
      setErrorMsg('');
    }
  }, [mobileNumber]);

  const checkboxTextTheme = {colors: {onSurface: COLORS.grey4}};
  const termsTextTheme = {colors: {onSurface: COLORS.blue}};

  const warningIcon = () => <WarningSvg height={20} width={20} />;

  const handleSubmit = () => {
    const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (!mobileNumber.match(mobileRegex)) {
      setErrorMsg(getTranslationLabel('mobile_number_not_registered'));
      return;
    }

    handleGetOtp(
      mobileNumber,
      setIsLoading,
      (resendBlockDurationSeconds: number) =>
        navigation.navigate('OtpVerification', {
          mobileNumber: CountryCode + mobileNumber,
          resendBlockDurationSeconds: resendBlockDurationSeconds,
        }),
    );
    // navigation.navigate('OtpVerification', {
    //   mobileNumber: mobileNumber,
    //   resendBlockDurationSeconds: 1000,
    // });
  };

  const BackButton = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Layout isScrollable>
      <ScreenHeader showScreenName={false} />
      <KeyboardAvoidingView style={CommonStyles.flexOne}>
        <View style={[CommonStyles.rowSpaceBetweenFlex]}>
          <View style={CommonStyles.flexOne}>
            <SubHeader>
              <View style={styles.bodyContainer}>
                <View style={styles.group}>
                  <Icon name="mobile1" size={32} color={COLORS.black} />
                  <View style={CommonStyles.padding5} />
                  <Text variant="headlineSmall">
                    {getTranslationLabel('login')}
                  </Text>
                </View>
                <View>
                  <Text variant="titleMedium" style={styles.EnterMobile}>
                    {getTranslationLabel('enter_mobile_num')}
                  </Text>
                </View>
                <PhoneInput
                  phoneNumber={mobileNumber}
                  onPhoneNumberChange={number => setMobileNumber(number)}
                  setCountryCode={setCountryCode}
                  error={errorMsg}
                />
              </View>
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
              style={styles.OTPButton}
              isDisabled={otpDisabled}
              type={ButtonTypes.contained}
              text={getTranslationLabel('get_otp')}
              onPress={handleSubmit}
              textStyle={(!otpDisabled && styles.OTPtextStyle) || {}}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};

//--------OLD-DESIGNS------------------------------------------------\\
// const Login = () => {
//   const [mobileNumber, setMobileNumber] = useState<string>('');
//   const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
//   const [errorMsg, setErrorMsg] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const navigation = useNavigation<AuthNavigationProp>();

//   useEffect(() => {
//     if (isMobileNumberValid(mobileNumber)) {
//       setErrorMsg(getTranslationLabel('invalid_mobile_number'));
//     } else {
//       setErrorMsg('');
//     }
//   }, [mobileNumber]);

//   const checkboxTextTheme = {colors: {onSurface: COLORS.grey4}};
//   const termsTextTheme = {colors: {onSurface: COLORS.blue}};

//   const warningIcon = () => <WarningSvg height={20} width={20} />;

//   const handleOtpSubmit = () => {
//     handleGetOtp(
//       mobileNumber,
//       setIsLoading,
//       (resendBlockDurationSeconds: number) =>
//         navigation.navigate('OtpVerification', {
//           mobileNumber: mobileNumber,
//           resendBlockDurationSeconds: resendBlockDurationSeconds,
//         }),
//     );
//     // navigation.navigate('OtpVerification', {
//     //   mobileNumber: mobileNumber,
//     //   resendBlockDurationSeconds: 1000,
//     // });
//   };

//   return (
//     <Layout isScrollable hideStatusBar>
//       {/* <Image
//         source={require('../../../../assets/images/loginHeader.png')}
//         style={styles.imageHeader}
//       /> */}
//       <ScreenHeader showScreenName={false} />
//       <View style={styles.imageHeader} />

//       <View style={styles.bodyContainer}>
//         <Text variant="headlineSmall">
//           {getTranslationLabel('enter_mobile_num')}
//         </Text>
//         <PrimaryTextInput
//           placeHolder={getTranslationLabel('enter_mobile_no')}
//           titleText={getTranslationLabel('mobile_number')}
//           isRequired={false}
//           value={mobileNumber}
//           keyboardType="numeric"
//           returnKeyType="done"
//           maxLength={10}
//           left={mobileNumber && <TextInput.Affix text="+91 |" />}
//           onChangeText={val => setMobileNumber(val)}
//           containerStyle={styles.textInputContainer}
//           textInputStyle={styles.textInputText}
//           right={
//             errorMsg.length !== 0 ? <TextInput.Icon icon={warningIcon} /> : null
//           }
//           error={errorMsg.length !== 0}
//           errorText={errorMsg}
//         />
//         <View style={styles.checkBoxView}>
//           <Checkbox.Android
//             status={termsAccepted ? 'checked' : 'unchecked'}
//             onPress={() => {
//               setTermsAccepted(!termsAccepted);
//             }}
//           />
//           <Text
//             variant="bodySmall"
//             theme={checkboxTextTheme}
//             style={styles.termsText}>
//             {getTranslationDynamicLabel('tnc_statement').startTextLabel}
//             <Text
//               theme={termsTextTheme}
//               onPress={() =>
//                 navigation.navigate('TermsAndConditions', {tnc: 'login'})
//               }>
//               {getTranslationDynamicLabel('tnc_statement').highlightTextLabel}
//             </Text>
//             {getTranslationDynamicLabel('tnc_statement').endTextLabel}
//           </Text>
//         </View>
//       </View>
//       <CustomButton
//         type={ButtonTypes.contained}
//         style={styles.button}
//         text={getTranslationLabel('get_otp')}
//         loading={isLoading}
//         // isDisabled={
//         //   isLoading ||
//         //   !termsAccepted ||
//         //   mobileNumber.length !== 10 ||
//         //   errorMsg.length !== 0
//         // }
//         onPress={handleOtpSubmit}
//       />
//       <ContactFooter />
//     </Layout>
//   );
// };

export default Login;
