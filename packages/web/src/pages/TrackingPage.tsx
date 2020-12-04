import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

const Tracking = React.lazy(() => import('../containers/Tracking'));

const TrackingPage = () => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <Tracking />
      </Route>
    </Switch>
  );
};

export default TrackingPage;
