import React from 'react';
import {useAuthState} from '../context/auth-context';
import AuthenticatedApp from '../containers/AuthenticatedApp';
import UnauthenticatedApp from '../containers/UnauthenticatedApp';

export default function Home() {
  const {isAuth} = useAuthState();
  return isAuth ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
