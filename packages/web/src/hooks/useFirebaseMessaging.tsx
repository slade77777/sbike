import React, {useEffect} from 'react';
import {notification} from 'antd';
import {messaging} from 'shared-logic';
import {checkSupportedNotifyBrowser} from '../utils/firebaseUtil';

type MessageType = {
  notification: {
    body: string;
    tag?: string;
    title: string;
  };
};

export default () => {
  useEffect(() => {
    checkSupportedNotifyBrowser();
  }, []);
  useEffect(() => {
    if (messaging) {
      messaging.onMessage((payload: MessageType) => {
        if (payload) {
          const key = `open${Date.now()}`;
          notification.open({
            className: 'fb-notify-container',
            message: (
              <span className="fb-notify-title">
                {payload?.notification?.title}
              </span>
            ),
            description: payload?.notification?.body,
            key,
            duration: 6,
          });
        }
      });
    }
  }, []);
};
