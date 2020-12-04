import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import Company from '../containers/Company';
import {RoutesEnum} from '../enum';
import Account from '../containers/Account';

const ManagementPage = () => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/${RoutesEnum.CompaniesManagement}`} exact>
        <Company />
      </Route>
      <Route path={`${path}/${RoutesEnum.UserManagement}`} exact>
        <Account />
      </Route>
    </Switch>
  );
};

export default ManagementPage;
