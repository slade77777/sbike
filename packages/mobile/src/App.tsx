import React, {useEffect} from 'react';
import Config from 'react-native-config';
import {setupBusinessLayer} from 'shared-logic';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';

import RootNavigator from './RootNavigator';
import {AuthProvider} from './context/auth-context';

setupBusinessLayer(Config.API_URL);

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      //on open
      console.log(remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          console.log(remoteMessage);
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // on foreground
      console.log(remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
