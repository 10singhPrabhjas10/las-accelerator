import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import notifee from '@notifee/react-native';

import ReduxProvider from './app/store/redux';
import {NoInternetToast} from './app/components/NoInternet';
import {PaperProvider} from 'react-native-paper';

// Navigation
import RootNavigation from './app/routes/RootNavigation';
import Icon from 'react-native-vector-icons/Feather';
import ErrorBoundary from './app/errorBoundary';
import {theme} from './app/theme/theme';
import {LogBox} from 'react-native';
import CommonStyles from './app/utils/commonStyle';
import {AutocompleteDropdownContextProvider} from './app/components/auto-complete/AutocompleteDropdownContext';
import {LocaleConfig} from 'react-native-calendars';
import {getFcmToken, notificationListener} from './app/utils/firebase';
import SplashScreen from 'react-native-splash-screen';
import {
  ErrorProvider,
  withErrorHandler,
} from '@/globalErrorHandler/ErroProvider';

LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = [
  'S',
  'M',
  'T',
  'W',
  'T',
  'F',
  'S',
];

Icon.loadFont();

//TODO: remove later added to avoid warnings in demo
LogBox.ignoreAllLogs();

let Root = function App() {
  useEffect(() => {
    SplashScreen.hide();

    (async function () {
      await notifee.requestPermission();
      getFcmToken();
    })();
    const unsubscribe = notificationListener();
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <ReduxProvider>
          <GestureHandlerRootView style={CommonStyles.flexOne}>
            <PaperProvider theme={theme}>
              <AutocompleteDropdownContextProvider>
                <ErrorProvider>
                  <RootNavigation />
                </ErrorProvider>
                <NoInternetToast />
              </AutocompleteDropdownContextProvider>
            </PaperProvider>
          </GestureHandlerRootView>
        </ReduxProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};
export default withErrorHandler(Root);

// export default Root;
