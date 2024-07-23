//External dependencies
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {Checkbox, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

//Internal dependencies
import Layout from 'components/Layout';
import ContactFooter from 'components/contactFooter/ContactFooter';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {AuthNavigationProp} from 'routes/AuthNavigator';
import {handleGetOtp} from '../Auth.business';
import CustomButton from 'components/button/CustomButton';

//Styles, Constants and interfaces
import styles from './Login.style';
import {COLORS} from 'theme/colors';
import {
  getTranslationDynamicLabel,
  getTranslationLabel,
  isMobileNumberValid,
} from 'utils/commonMethods';
import WarningSvg from './../../../../assets/icons/warning-circle.svg';
import {ButtonTypes} from 'types/buttons';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleOtpSubmit = () => {
    handleGetOtp(
      mobileNumber,
      setIsLoading,
      (resendBlockDurationSeconds: number) =>
        navigation.navigate('OtpVerification', {
          mobileNumber: mobileNumber,
          resendBlockDurationSeconds: resendBlockDurationSeconds,
        }),
    );
  };

  return (
    <Layout isScrollable hideStatusBar>
      <Image
        source={require('../../../../assets/images/loginHeader.png')}
        style={styles.imageHeader}
      />
      <View style={styles.bodyContainer}>
        <Text variant="headlineSmall">
          {getTranslationLabel('enter_mobile_num')}
        </Text>
        <PrimaryTextInput
          placeHolder={getTranslationLabel('enter_mobile_no')}
          titleText={getTranslationLabel('mobile_number')}
          isRequired={false}
          value={mobileNumber}
          keyboardType="numeric"
          returnKeyType="done"
          maxLength={10}
          left={mobileNumber && <TextInput.Affix text="+91 |" />}
          onChangeText={val => setMobileNumber(val)}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.textInputText}
          right={
            errorMsg.length !== 0 ? <TextInput.Icon icon={warningIcon} /> : null
          }
          error={errorMsg.length !== 0}
          errorText={errorMsg}
        />
        <View style={styles.checkBoxView}>
          <Checkbox.Android
            status={termsAccepted ? 'checked' : 'unchecked'}
            onPress={() => {
              setTermsAccepted(!termsAccepted);
            }}
          />
          <Text
            variant="bodySmall"
            theme={checkboxTextTheme}
            style={styles.termsText}>
            {getTranslationDynamicLabel('tnc_statement').startTextLabel}
            <Text
              theme={termsTextTheme}
              onPress={() =>
                navigation.navigate('TermsAndConditions', {tnc: 'login'})
              }>
              {getTranslationDynamicLabel('tnc_statement').highlightTextLabel}
            </Text>
            {getTranslationDynamicLabel('tnc_statement').endTextLabel}
          </Text>
        </View>
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        style={styles.button}
        text={getTranslationLabel('get_otp')}
        loading={isLoading}
        isDisabled={
          isLoading ||
          !termsAccepted ||
          mobileNumber.length !== 10 ||
          errorMsg.length !== 0
        }
        onPress={handleOtpSubmit}
      />
      <ContactFooter />
    </Layout>
  );
};

export default Login;
