import React, {FC} from 'react';
import {login, setToken, logout} from 'shared-logic';
import AsyncStorage from '@react-native-community/async-storage';
const AES = require('react-native-crypto-js').AES;
// @ts-ignore
import CryptoJS from 'react-native-crypto-js';
import messaging from '@react-native-firebase/messaging';
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
            isLoading: false,
            isSubmitting: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            isLoading: false,
            userData: {},
            isSubmitting: false,
          };
        case 'SUBMITTING':
          return {
            ...prevState,
            isSubmitting: true
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userData: {},
      isSubmitting: false
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
          dispatch({type: 'SIGN_OUT'});
          setTimeout(() => {
            alert(data.message);
          }, 1000)
        } else {
          // @ts-ignore
          let userData: User = data?.user || {};
          userData.userToken = data?.session;
          userData.originalPassword = password;
          AsyncStorage.setItem('userData', JSON.stringify(userData))
            .then(() => {
              setToken(userData?.userToken || '');
              dispatch({type: 'SIGN_IN', userData});
            })
            .catch(() => {
              dispatch({type: 'SIGN_OUT'});
              console.log('error')
            });
        }
      })
      .catch((error) => {
        dispatch({type: 'SIGN_OUT'});
        setTimeout(() => {
          alert(error.message);
        }, 100)
      });
  };

  const handleLogout = () => {
    messaging()
      .getToken()
      .then((token) => {
        logout(token).then(() => {
          AsyncStorage.removeItem('userData').then(() => {
            dispatch({type: 'SIGN_OUT'});
          });
        });
      }).catch(() => {
      logout('').then(() => {
        AsyncStorage.removeItem('userData').then(() => {
          dispatch({type: 'SIGN_OUT'});
        });
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
