import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import Tracking from '../containers/Tracking';

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
