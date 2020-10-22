import React, {FC} from 'react';
import {User, login, UserResponse} from 'shared-logic';
import {useMutation} from 'react-query';

type AuthType = {
  status: 'success' | 'pending' | 'error' | 'idle';
  error?: any;
  user?: {
    username: string;
  } | null;
  login: (params: User) => void;
};

const AuthContext = React.createContext<AuthType>({
  status: 'pending',
  error: null,
  user: null,
  login: null,
});

// const sleep = (time: number) =>
//   new Promise((resolve) => setTimeout(resolve, time));

// const getUser = () => sleep(1000).then(() => ({username: ''}));

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({children}) => {
  const [state, setState] = React.useState<AuthType>({
    status: 'idle',
    error: null,
    user: null,
  });

  const [handleLogin] = useMutation(login, {
    onSuccess: (data: UserResponse) => {
      // Query Invalidations
      console.log(data);
    },
  });

  // React.useEffect(() => {
  //   getUser()
  //     .then(
  //       (user) =>
  //         setState({
  //           status: 'success',
  //           error: null,
  //           user: user.username ? user : null,
  //         }),
  //       (error) => setState({status: 'error', error, user: null}),
  //     )
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

  return (
    <AuthContext.Provider value={{...state, login: handleLogin}}>
      {state.status === 'pending' ? (
        'Loading...'
      ) : state.status === 'error' ? (
        <div>
          Oh no
          <div>
            <pre>{state.error.message}</pre>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

function useAuthState() {
  const state = React.useContext(AuthContext);
  const isPending = state.status === 'pending';
  const isError = state.status === 'error';
  const isSuccess = state.status === 'success';
  const isAuthenticated = state.user && isSuccess;
  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
  };
}

export {AuthProvider, useAuthState};
