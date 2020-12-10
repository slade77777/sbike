import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

const Devices = React.lazy(() => import('../containers/Devices'));
const DeviceDetail = React.lazy(
  () => import('../containers/Devices/DeviceDetail'),
);

const DevicePage = () => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <Devices />
      </Route>
      <Route path={`${path}/:deviceID`} exact>
        <DeviceDetail />
      </Route>
    </Switch>
  );
};

export default DevicePage;
