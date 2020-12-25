import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCCpjv71kBl6noJavE593UrQ2TBuPOX4SU',
  authDomain: 'sbike-6fc97.firebaseapp.com',
  databaseURL: 'https://sbike-6fc97.firebaseio.com',
  projectId: 'sbike-6fc97',
  storageBucket: 'sbike-6fc97.appspot.com',
  messagingSenderId: '787092921860',
  appId: '1:787092921860:web:d91ac25f3cbce5828b5f51',
  measurementId: 'G-G8ENTK9JX7',
};

firebase.initializeApp(firebaseConfig);
let messaging = null;

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}

export {messaging};
