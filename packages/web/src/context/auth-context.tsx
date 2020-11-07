import React, {FC, useEffect, useState} from 'react';
import {setToken} from 'shared-logic';

type AuthType = {
  isAuth: boolean;
  onLoginSuccess: (session: string) => void;
  onLogoutSuccess: () => void;
};

const AuthContext = React.createContext<AuthType>({
  isAuth: false,
  onLoginSuccess: () => null,
  onLogoutSuccess: () => null,
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({children}) => {
  const [isAuth, setIsAuth] = useState<boolean>(
    () => !!localStorage.getItem('session'),
  );

  function onLoginSuccess(session: string) {
    if (session) {
      setIsAuth(true);
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => React.useContext(AuthContext);

export {AuthProvider, useAuthState};
