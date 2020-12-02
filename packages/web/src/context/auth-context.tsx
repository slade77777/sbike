import React, {FC, useEffect, useState} from 'react';
import {login, setToken, User, logout} from 'shared-logic';
import {useMutation} from 'react-query';

type AuthType = {
  isAuth: boolean;
  userInfo?: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  loginLoading?: boolean;
};

const AuthContext = React.createContext<AuthType>({
  isAuth: false,
  onLogin: () => null,
  onLogout: () => null,
  userInfo: null,
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({children}) => {
  const [isAuth, setIsAuth] = useState<boolean>(
    () => !!localStorage.getItem('session'),
  );
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const localSession = localStorage.getItem('session');
    if (localSession) {
      setToken(localSession);
    }
  }, []);

  const [logoutMutation, loginState] = useMutation(logout, {
    onSuccess: () => {
      localStorage.removeItem('session');
      setIsAuth(false);
    },
  });

  const [loginMutation] = useMutation(login, {
    onSuccess: (res) => {
      if (res?.data?.session) {
        setIsAuth(true);
        setUserInfo(res?.data?.user);
        localStorage.setItem('session', res.data.session);
        setToken(res.data.session);
      }
    },
  });

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        onLogout: logoutMutation,
        onLogin: loginMutation,
        loginLoading: loginState.isLoading,
        userInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => React.useContext(AuthContext);

export {AuthProvider, useAuthState};
