import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {RoutesEnum} from '../enum';

const ReportPage = () => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/${RoutesEnum.AlertMovingReport}`} exact>
        <div>Canh bao di chuyen</div>
      </Route>
      <Route path={`${path}/${RoutesEnum.TurnOnOfReport}`} exact>
        <div>Tat bat may</div>
      </Route>
      <Route path={`${path}/${RoutesEnum.OverSpeedReport}`} exact>
        <div>Qua toc do</div>
      </Route>
      <Route path={`${path}/${RoutesEnum.InOutSafeZoneReport}`} exact>
        <div>InOutSafeZoneReport</div>
      </Route>
    </Switch>
  );
};

export default ReportPage;
