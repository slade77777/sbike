import React, {FC, useEffect, useState} from 'react';
import {
  Device,
  getDevicesByCompanyID,
  getUserInfo,
  logout,
  registerFCMTopics,
  setToken,
  User,
  UserResponse,
} from 'shared-logic';
import {useMutation, useQuery} from 'react-query';
import {message} from 'antd';
import useFirebaseToken from '../hooks/useFirebaseToken';

type AuthType = {
  isAuth: boolean;
  userInfo?: User | null;
  onLogout: () => void;
  handleLoginSuccess: (data: UserResponse) => void;
  loginLoading?: boolean;
  devices?: Device[];
  firebaseToken?: string;
  loadingDevices?: boolean;
};

const AuthContext = React.createContext<AuthType>({
  isAuth: false,
  onLogout: () => null,
  handleLoginSuccess: () => null,
  userInfo: null,
  devices: [],
  firebaseToken: '',
  loadingDevices: false,
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({children}) => {
  const [isAuth, setIsAuth] = useState<boolean>(
    () => !!localStorage.getItem('session'),
  );
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const firebaseToken = useFirebaseToken();

  useEffect(() => {
    const localSession = localStorage.getItem('session');
    if (localSession) {
      setToken(localSession);
      fetchUserInfo();
    }
  }, []);

  const companyID = localStorage.getItem('companyID');

  const userInfoMutation = useMutation(getUserInfo, {
    onSuccess: async (data) => {
      setUserInfo(data?.data || null);
    },
  });

  async function fetchUserInfo() {
    await userInfoMutation.mutate();
  }

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      handleLogout();
    },
    onError: () => {
      handleLogout();
    },
    onSettled: () => {
      handleLogout();
    },
  });

  async function logoutAsync() {
    if (firebaseToken) {
      await logoutMutation.mutate(firebaseToken);
    }
  }

  function handleLogout() {
    localStorage.removeItem('session');
    localStorage.removeItem('companyID');
    setIsAuth(false);
  }

  const devicesRes = useQuery(
    [companyID, 'devices'],
    () => getDevicesByCompanyID(companyID || ''),
    {
      refetchInterval: 30000,
      refetchIntervalInBackground: true,
      enabled: !!companyID,
    },
  );

  const registerTopicMutation = useMutation(registerFCMTopics, {
    onError: () => {
      message.error('Đăng ký nhận thông báo thất bại');
    },
  });

  async function handleLoginSuccess(data: UserResponse) {
    setIsAuth(true);
    setUserInfo(data?.user);
    localStorage.setItem('session', data?.session);
    localStorage.setItem('companyID', data?.user?.companyID || '');
    setToken(data?.session);
    await registerTopicMutation.mutate({
      companyID: data.user.companyID || '',
      token: firebaseToken || '',
    });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        userInfo,
        onLogout: logoutAsync,
        handleLoginSuccess,
        devices: devicesRes?.data?.data || [],
        loadingDevices: devicesRes.isLoading,
        firebaseToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => React.useContext(AuthContext);

export {AuthProvider, useAuthState};
