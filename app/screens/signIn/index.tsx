import React, { Component, useState } from 'react';
import { WebView } from 'react-native-webview';

// style
import { styles } from './styles';

// store
import { useTokenStore } from '../../store/token';


const SignInScreen = () => {
  const increaseToken = useTokenStore(state => state.increaseToken);

  const state = {
    cookies    : {},
    webViewUrl : ''
  }

  const onNavigationStateChange = (webViewState: { url: string }) => {
    const { url } = webViewState;
  }

  const onMessage = (event: any) => {
    const { data } = event.nativeEvent;

    if (data) {
      const parsedData = JSON.parse(data);
      const glbid = parsedData['glbid'];

      if (glbid) {
        increaseToken(glbid);
      }
    }
  }

  const INJECTED_JAVASCRIPT = `(function() {
    const tokenLocalStorage = window.localStorage.getItem('cdUserCodeGlb_v3');
    window.ReactNativeWebView.postMessage(tokenLocalStorage);
  })();`;

  return (
    <WebView
      source={{ uri: 'https://cartola.globo.com/#!/login' }}
      onNavigationStateChange={onNavigationStateChange}
      thirdPartyCookiesEnabled={true}
      onMessage={onMessage}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      style={styles.container}
    />
  );
  
}

export default SignInScreen;