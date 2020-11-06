import React, {FC, useState} from 'react';

type AuthType = {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
};

const AuthContext = React.createContext<AuthType>({
  isAuth: false,
  setIsAuth: () => null,
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({children}) => {
  const [isAuth, setIsAuth] = useState<boolean>(
    () => !!localStorage.getItem('session'),
  );

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => React.useContext(AuthContext);

export {AuthProvider, useAuthState};
