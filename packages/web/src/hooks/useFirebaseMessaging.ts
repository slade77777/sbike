import {useEffect, useRef} from 'react';
import {message, notification} from 'antd';
import {useMutation} from 'react-query';
import {messaging, registerFCMTopics} from 'shared-logic';
import {useGlobalState} from '../context/devices-context';
import useFirebaseToken from './useFirebaseToken';

function requestPermission() {
  // eslint-disable-next-line promise/catch-or-return
  window.Notification.requestPermission().then((permission: string) => {
    // eslint-disable-next-line promise/always-return
    if (permission === 'granted') {
      // ok
    } else {
      message.warn(
        'Hãy bật tính năng thông báo của trình duyệt đẻ nhận thông báo khi có tin nhắn mới',
      );
    }
  });
  // [END request_permission]
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
    if (useInfo && token && isOneTime.current) {
      callToRegisterTopics(useInfo.companyID || '', token);
      isOneTime.current = false;
    }
  }, [token, useInfo]);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (messaging) {
      messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        notification.info({
          message: 'Thông báo',
          description: payload?.notification || 'Có thông báo mới',
        });
      });
    }
  }, []);
};
