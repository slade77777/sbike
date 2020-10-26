import React, {FC} from 'react';
import {User, login, UserResponse} from 'shared-logic';
import {useMutation} from 'react-query';

type AuthType = {
  status?: 'idle' | 'loading' | 'error' | 'success';
  error: any;
  isLoading: boolean;
  isError: boolean;
  isAuthenticated: boolean;
  login: (params: User) => void;
};

const AuthContext = React.createContext<AuthType>({
  status: 'idle',
  error: null,
  user: null,
  login: null,
  isAuthenticated: false,
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({children}) => {
  const [
    loginMutate,
    {isLoading, isError, error, isSuccess, data},
  ] = useMutation(login);

  async function handleLogin(user: User) {
    try {
      const dataLogin: UserResponse = await loginMutate(user);
      localStorage.setItem('session', dataLogin.session);
    } catch {}
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isError,
        error,
        login: handleLogin,
        isAuthenticated:
          (isSuccess && data?.user) || localStorage.getItem('session'),
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => React.useContext(AuthContext);

export {AuthProvider, useAuthState};
