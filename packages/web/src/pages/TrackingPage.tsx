import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

const Tracking = React.lazy(() => import('../containers/Tracking'));
const SafeZoneAlert = React.lazy(
  () => import('../containers/Tracking/SafeZoneAlert'),
);

const TrackingPage = () => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <Tracking />
      </Route>
      <Route path={`${path}/:deviceID/canh-bao-vung-an-toan`} exact>
        <SafeZoneAlert />
      </Route>
    </Switch>
  );
};

export default TrackingPage;
