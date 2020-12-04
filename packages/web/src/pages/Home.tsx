import React from 'react';
import {useAuthState} from '../context/auth-context';

const AuthenticatedApp = React.lazy(
  () => import('../containers/AuthenticatedApp'),
);
const UnauthenticatedApp = React.lazy(
  () => import('../containers/UnauthenticatedApp'),
);

export default function Home() {
  const {isAuth} = useAuthState();
  return isAuth ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
