import React, {FC, useEffect, useState} from 'react';
import {setToken, User, UserResponse} from 'shared-logic';

type AuthType = {
  isAuth: boolean;
  userInfo?: User | null;
  handleLogout: () => void;
  handleLoginSuccess: (data: UserResponse) => void;
  loginLoading?: boolean;
};

const AuthContext = React.createContext<AuthType>({
  isAuth: false,
  handleLogout: () => null,
  handleLoginSuccess: () => null,
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

  function handleLogout() {
    localStorage.removeItem('session');
    setIsAuth(false);
  }

  function handleLoginSuccess(data: UserResponse) {
    setIsAuth(true);
    setUserInfo(data?.user);
    localStorage.setItem('session', data?.session);
    setToken(data?.session);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        userInfo,
        handleLogout,
        handleLoginSuccess,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => React.useContext(AuthContext);

export {AuthProvider, useAuthState};
