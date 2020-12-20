import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
// import {RoutesEnum} from '../enum';
import Report from '../containers/Report';

const ReportPage = () => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:type`} exact>
        <Report />
      </Route>
    </Switch>
  );
};

export default ReportPage;
