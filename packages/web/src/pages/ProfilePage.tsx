import React, {Suspense} from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import {Spin} from 'antd';

const Profile = React.lazy(() => import('../containers/Account/Profile'));

const ProfilePage = () => {
  const {path} = useRouteMatch();
  return (
    <Suspense fallback={<Spin />}>
      <Switch>
        <Route path={path} exact>
          <Profile />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default ProfilePage;
