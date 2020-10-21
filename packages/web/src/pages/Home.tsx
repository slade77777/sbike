import React from 'react';
// import {Link} from 'react-router-dom';
// import {useProjects} from 'shared-logic';
import {useAuthState} from '../context/auth-context';

const AuthenticatedApp = React.lazy(
  () => import('../containers/AuthenticatedApp'),
);
const UnauthenticatedApp = React.lazy(
  () => import('../containers/UnauthenticatedApp'),
);

export default function Home() {
  const {user} = useAuthState();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
