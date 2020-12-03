import React, {FC, useEffect, useState} from 'react';
import {login, setToken, User, logout, UserResponse} from 'shared-logic';
import {useMutation} from 'react-query';

type AuthType = {
  isAuth: boolean;
  userInfo?: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  handleLogout: () => void;
  loginLoading?: boolean;
};

const AuthContext = React.createContext<AuthType>({
  isAuth: false,
  onLogin: () => null,
  onLogout: () => null,
  handleLogout: () => null,
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
    localStorage.setItem('session', data.session);
    setToken(data.session);
  }

  const [logoutMutation, loginState] = useMutation(logout, {
    onSuccess: () => {
      handleLogout();
    },
  });

  const [loginMutation] = useMutation(login, {
    onSuccess: (res) => {
      if (res?.data?.session) {
        handleLoginSuccess(res.data);
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
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => React.useContext(AuthContext);

export {AuthProvider, useAuthState};
