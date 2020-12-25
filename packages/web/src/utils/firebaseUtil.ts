import {message} from 'antd';

export function checkSupportedNotifyBrowser() {
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
