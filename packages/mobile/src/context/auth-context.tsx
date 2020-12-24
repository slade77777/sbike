import React, {FC} from 'react';
import {login, setToken, logout} from 'shared-logic';
import AsyncStorage from '@react-native-community/async-storage';
const AES = require('react-native-crypto-js').AES;
import CryptoJS from 'react-native-crypto-js';
import messaging from '@react-native-firebase/messaging';
import {registerTopic} from 'shared-logic/src/api/firebase';
import {User} from 'shared-logic/src';

type AuthType = {
  state: any;
  dispatch: any;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
};

const AuthContext = React.createContext<AuthType>({
  state: null,
  dispatch: () => {},
  signIn: () => {},
  signOut: () => {},
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userData: action.userData,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userData: action.userData,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userData: {},
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userData: {},
    },
  );

  const handleLogin = (username: string, password: string) => {
    const key = CryptoJS.enc.Utf8.parse('{60F9sG3*vpfCknu');
    const iv = CryptoJS.enc.Utf8.parse('0123456789123456');
    login({
      userName: username,
      password: password ? AES.encrypt(password, key, {iv}).toString() : '',
    })
      .then((data) => data.data)
      .then((data) => {
        if (data?.errorCode) {
          return alert(data.message);
        }
        let userData: User = data?.user || {};
        userData.userToken = data?.session;
        userData.originalPassword = password;
        AsyncStorage.setItem('userData', JSON.stringify(userData))
          .then(() => {
            setToken(userData?.userToken || '');
            dispatch({type: 'SIGN_IN', userData});
          })
          .catch(() => console.log('error'));
      })
      .catch((error) => alert(error.message));
  };

  const handleLogout = () => {
    logout().then(() => {
      AsyncStorage.removeItem('userData').then(() => {
        dispatch({type: 'SIGN_OUT'});
      });
    });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        signIn: (username, password) => handleLogin(username, password),
        signOut: () => handleLogout(),
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => React.useContext(AuthContext);

export {AuthProvider, useAuthState};
