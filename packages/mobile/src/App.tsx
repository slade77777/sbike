import React from 'react';
import Config from 'react-native-config';
import {setupBusinessLayer} from 'shared-logic';
import SplashScreen from 'react-native-splash-screen';

import RootNavigator from './RootNavigator';
import {AuthProvider} from './context/auth-context';

setupBusinessLayer(Config.API_URL);

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
