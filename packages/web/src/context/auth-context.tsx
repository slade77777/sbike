import React, {FC, useEffect, useState} from 'react';
import {setToken, User} from 'shared-logic';

type AuthType = {
  isAuth: boolean;
  userInfo?: User | null;
  onLoginSuccess: (session: string, user: User) => void;
  onLogoutSuccess: () => void;
};

const AuthContext = React.createContext<AuthType>({
  isAuth: false,
  onLoginSuccess: () => null,
  onLogoutSuccess: () => null,
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

  function onLoginSuccess(session: string, user: User) {
    if (session) {
      setIsAuth(true);
      setUserInfo(user);
      localStorage.setItem('session', session);
      setToken(session);
    }
  }

  function onLogoutSuccess() {
    setIsAuth(false);
    localStorage.removeItem('session');
  }

  useEffect(() => {
    const localSession = localStorage.getItem('session');
    if (localSession) {
      setToken(localSession);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        onLoginSuccess,
        onLogoutSuccess,
        userInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => React.useContext(AuthContext);

export {AuthProvider, useAuthState};
