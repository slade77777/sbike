import React, {useEffect, useRef} from 'react';
import {message, notification} from 'antd';
import {useMutation} from 'react-query';
import {messaging, registerFCMTopics} from 'shared-logic';
import {useGlobalState} from '../context/devices-context';
import useFirebaseToken from './useFirebaseToken';

type MessageType = {
  notification: {
    body: string;
    tag?: string;
    title: string;
  };
};

function checkSupportedNotifyBrowser() {
  let isSupported = true;
  if (!('Notification' in window)) {
    message.warn('Trình duyệt này không hỗ trợ nhận thông báo!');
    isSupported = false;
  } else if (Notification.permission === 'granted') {
    isSupported = true;
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        isSupported = true;
      }
    });
  }
  return isSupported;
}

export default () => {
  const isOneTime = useRef(true);
  const {useInfo} = useGlobalState();
  const token = useFirebaseToken();

  const [mutate] = useMutation(registerFCMTopics, {
    onError: () => {
      message.error('Đăng ký nhận thông báo thất bại');
    },
  });

  async function callToRegisterTopics(companyID: string, token: string) {
    await mutate({companyID, token});
  }

  useEffect(() => {
    if (
      useInfo &&
      token &&
      isOneTime.current &&
      checkSupportedNotifyBrowser()
    ) {
      callToRegisterTopics(useInfo.companyID || '', token);
      isOneTime.current = false;
    }
  }, [token, useInfo]);

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
