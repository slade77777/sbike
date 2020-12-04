import React, {Suspense} from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import {Spin} from 'antd';

const Tracking = React.lazy(() => import('../containers/Tracking'));

const TrackingPage = () => {
  const {path} = useRouteMatch();
  return (
    <Suspense fallback={<Spin />}>
      <Switch>
        <Route path={path} exact>
          <Tracking />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default TrackingPage;
