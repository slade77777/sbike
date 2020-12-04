import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import DeviceDetail from '../containers/Devices/DeviceDetail';
import Devices from '../containers/Devices';

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
