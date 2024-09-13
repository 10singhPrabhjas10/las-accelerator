import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import OtpVerification from 'screens/auth/otpVerification/OtpVerification.screen';
import Login from 'screens/auth/login/Login.screen';
import TermsAndConditions from 'screens/termsAndConditions/TermsAndConditions.screen';
import {AttendanceLandingScreen} from '../screens/attendance/attendance-landing/landing.screen';

export type AuthNavigationTypes = {
  Login: undefined;
  OtpVerification: {mobileNumber: string; resendBlockDurationSeconds: number};
  attendance: {title: string};
  TermsAndConditions: {tnc: string; entityId?: string};
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthNavigationTypes>;

const Stack = createNativeStackNavigator<AuthNavigationTypes>();

const AuthNavigator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="attendance" component={AttendanceLandingScreen} />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigator;
