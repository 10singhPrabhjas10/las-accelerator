import React, {useEffect, useRef, useState} from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Layout from 'components/Layout';

import CommonStyles from 'utils/commonStyle';
import {webViewURL} from 'utils/Constants';
import {RootNavigationProp} from 'routes/RootNavigation';
import {getTranslationLabel} from 'utils/commonMethods';

const WebViewScreen = () => {
  let webRef = useRef<any>(null);
  const [navState, setNavState] = useState(true);
  const navigation = useNavigation<RootNavigationProp>();

  const handleNavigationStateChange = (navigationState: WebViewNavigation) => {
    setNavState(navigationState?.canGoBack);
  };

  const handleBackButton = () => {
    if (navState) {
      if (webRef.current) {
        webRef?.current?.goBack();
        return true; // Prevent default behavior
      }
    } else {
      navigation.goBack();
    }

    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    // Remove event listener on component unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout
      headerTitle={getTranslationLabel('product_display')}
      onBackPress={handleBackButton}>
      <WebView
        style={CommonStyles.flexOne}
        ref={webRef}
        source={{uri: webViewURL}}
        ignoreSslError={true}
        onNavigationStateChange={handleNavigationStateChange}
        allowsBackForwardNavigationGestures={false}
        javaScriptEnabled={false}
      />
    </Layout>
  );
};

export default WebViewScreen;
