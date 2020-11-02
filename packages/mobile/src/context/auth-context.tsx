import React, {FC} from 'react';
import {login} from 'shared-logic';
import {useMutation} from 'react-query';
import AsyncStorage from "@react-native-community/async-storage";

const AES = require("react-native-crypto-js").AES;
import CryptoJS from "react-native-crypto-js";

type AuthType = {
  state: any,
  dispatch: any,
  signIn: (username: string, password: string) => void;
};

const AuthContext = React.createContext<AuthType>({
  state: null,
  dispatch: () => {},
  signIn: () => {},
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
    }
  );

  const handleLogin = (username: string, password: string) => {
    const key = CryptoJS.enc.Utf8.parse('{60F9sG3*vpfCknu');
    const iv = CryptoJS.enc.Utf8.parse('0123456789123456');
    login({userName: username, password: password ? AES.encrypt(password, key, {iv}).toString() : ''})
      .then(data => {
        if (data.errorCode) {
          return alert(data.message);
        }
        let userData = data.user;
        userData.userToken = data.session;
        AsyncStorage.setItem('userData', JSON.stringify(userData)).then(() => {
          dispatch({type: 'SIGN_IN', userData});
        })
          .catch(() => console.log('error'));
      })
      .catch(error => console.log(error));
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        signIn: (username, password) => handleLogin(username, password),
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => React.useContext(AuthContext);

export {AuthProvider, useAuthState};
