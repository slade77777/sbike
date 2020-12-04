import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

const Profile = React.lazy(() => import('../containers/Account/Profile'));

const ProfilePage = () => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <Profile />
      </Route>
    </Switch>
  );
};

export default ProfilePage;
