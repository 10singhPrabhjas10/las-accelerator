//External dependencies
import {Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text, TextInput} from 'react-native-paper';
import {RouteProp, useRoute} from '@react-navigation/native';

//Internal dependencies
import Layout from 'components/Layout';
import ContactFooter from 'components/contactFooter/ContactFooter';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {AuthNavigationTypes} from 'routes/AuthNavigator';
import {handleResendOtp, handleVerifyOtp} from '../Auth.business';
import CustomButton from 'components/button/CustomButton';
import ScreenHeader from 'components/headers/ScreenHeader';

//Styles, Constants and interfaces
import {COLORS} from 'theme/colors';
import styles from './OtpVerification.style';
import {getTranslationLabel, secondsToMinutes} from 'utils/commonMethods';
import WarningSvg from './../../../../assets/icons/warning-circle.svg';
import {ButtonTypes} from 'types/buttons';

const OtpVerification = () => {
  const route = useRoute<RouteProp<AuthNavigationTypes, 'OtpVerification'>>();
  const otpTimer = route.params?.resendBlockDurationSeconds;
  const [otp, setOtp] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [resendOtpTimer, setResendOtpTimer] = useState<number>(otpTimer);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mobileNumber = route.params?.mobileNumber;

  const textTheme = {colors: {onSurface: COLORS.grey4}};
  const resendOtpTheme = {colors: {onSurface: COLORS.blue}};

  const resendOtpLabel = getTranslationLabel('resend_otp');
  const resendOtpInLabel = getTranslationLabel('resend_otp_in');

  const warningIcon = () => <WarningSvg height={20} width={20} />;

  useEffect(() => {
    let interval = setInterval(() => {
      if (resendOtpTimer > 0) {
        setResendOtpTimer(resendOtpTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resendOtpTimer]);

  return (
    <Layout isScrollable hideStatusBar>
      {/* <Image
        source={require('../../../../assets/images/loginHeader.png')}
        style={styles.imageHeader}
      /> */}
      <ScreenHeader showScreenName={false} />
      <View style={styles.imageHeader} />
      <View style={styles.bodyContainer}>
        <Text variant="headlineSmall">{getTranslationLabel('otp_verify')}</Text>
        <Text variant="bodyMedium" theme={textTheme} style={styles.otpTitle}>
          {getTranslationLabel('otp_sent_successfully')}
        </Text>
        <PrimaryTextInput
          titleText={getTranslationLabel('mobile_number')}
          isRequired={false}
          value={mobileNumber}
          disabled
          keyboardType="numeric"
          maxLength={10}
          left={mobileNumber && <TextInput.Affix text="+91 |" />}
          onChangeText={() => {}}
          containerStyle={styles.textInputContainer}
        />
        <PrimaryTextInput
          placeHolder={getTranslationLabel('enter_the_code_here')}
          titleText={getTranslationLabel('enter_otp')}
          isRequired={false}
          value={otp}
          keyboardType="numeric"
          returnKeyType="done"
          maxLength={6}
          onChangeText={val => setOtp(val)}
          containerStyle={styles.textInputContainer}
          error={errorMsg.length !== 0}
          errorText={errorMsg}
          right={
            errorMsg.length !== 0 ? <TextInput.Icon icon={warningIcon} /> : null
          }
        />
        <Text variant="bodyMedium" theme={textTheme} style={styles.resendOtp}>
          {getTranslationLabel('didnt_receive_otp?')}{' '}
          <Text
            theme={resendOtpTheme}
            disabled={resendOtpTimer > 0}
            onPress={() => {
              setOtp('');
              handleResendOtp(mobileNumber, () => {
                setResendOtpTimer(otpTimer);
              });
            }}>
            {resendOtpTimer > 0
              ? `${resendOtpInLabel} ${secondsToMinutes(resendOtpTimer)}`
              : resendOtpLabel}
          </Text>
        </Text>
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        style={styles.button}
        text={getTranslationLabel('verify')}
        loading={isLoading}
        isDisabled={isLoading || otp.length !== 6}
        onPress={() =>
          handleVerifyOtp(mobileNumber, otp, setIsLoading, setErrorMsg, setOtp)
        }
      />
      <ContactFooter />
    </Layout>
  );
};

export default OtpVerification;
