import React from 'react';
import Config from 'react-native-config';
import {setupBusinessLayer, useStore} from 'shared-logic';
import SplashScreen from 'react-native-splash-screen';

import {Provider} from 'react-redux';

import {I18nextProvider} from 'react-i18next';
import RootNavigator from './RootNavigator';
import i18n from './i18n';

setupBusinessLayer(Config.API_URL);

export default function App() {
  const store = useStore();

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </I18nextProvider>
  );
}
