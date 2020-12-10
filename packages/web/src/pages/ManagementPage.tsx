import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import {RoutesEnum} from '../enum';

const Account = React.lazy(() => import('../containers/Account'));
const Company = React.lazy(() => import('../containers/Company'));

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
