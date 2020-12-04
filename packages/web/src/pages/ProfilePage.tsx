import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import Profile from '../containers/Account/Profile';

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
