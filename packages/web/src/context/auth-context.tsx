import React, {FC} from 'react';

type AuthType = {
  status: 'success' | 'pending' | 'error';
  error?: any;
  user?: {
    username: string;
  } | null;
};

const AuthContext = React.createContext<AuthType>({
  status: 'pending',
  error: null,
  user: null,
});

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

const getUser = () => sleep(1000).then(() => ({username: ''}));

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({children}) => {
  const [state, setState] = React.useState<AuthType>({
    status: 'pending',
    error: null,
    user: null,
  });
  React.useEffect(() => {
    getUser()
      .then(
        (user) =>
          setState({
            status: 'success',
            error: null,
            user: user.username ? user : null,
          }),
        (error) => setState({status: 'error', error, user: null}),
      )
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <AuthContext.Provider value={state}>
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
