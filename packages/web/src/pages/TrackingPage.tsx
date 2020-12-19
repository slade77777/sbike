import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

const Tracking = React.lazy(() => import('../containers/Tracking'));
const Alert = React.lazy(() => import('../containers/Alert'));

const TrackingPage = () => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <Tracking />
      </Route>
      <Route path={`${path}/:deviceID/canh-bao`} exact>
        <Alert />
      </Route>
    </Switch>
  );
};

export default TrackingPage;
