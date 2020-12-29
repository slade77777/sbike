importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCCpjv71kBl6noJavE593UrQ2TBuPOX4SU',
  authDomain: 'sbike-6fc97.firebaseapp.com',
  databaseURL: 'https://sbike-6fc97.firebaseio.com',
  projectId: 'sbike-6fc97',
  storageBucket: 'sbike-6fc97.appspot.com',
  messagingSenderId: '787092921860',
  appId: '1:787092921860:web:d91ac25f3cbce5828b5f51',
  measurementId: 'G-G8ENTK9JX7',
});

const messaging = firebase.messaging();

let isFirst = true;

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  if (isFirst) {
    self.registration.showNotification(notificationTitle, notificationOptions);
    isFirst = false;
  }
});
