import React, {Suspense} from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import {Spin} from 'antd';

const Devices = React.lazy(() => import('../containers/Devices'));
const DeviceDetail = React.lazy(
  () => import('../containers/Devices/DeviceDetail'),
);

const DevicePage = () => {
  const {path} = useRouteMatch();
  return (
    <Suspense fallback={<Spin />}>
      <Switch>
        <Route path={path} exact>
          <Devices />
        </Route>
        <Route path={`${path}/:deviceID`} exact>
          <DeviceDetail />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default DevicePage;
