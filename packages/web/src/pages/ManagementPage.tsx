import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import {RoutesEnum} from '../enum';
import usePermission from '../hooks/usePermission';

const Account = React.lazy(() => import('../containers/Account'));
const Company = React.lazy(() => import('../containers/Company'));

const ManagementPage = () => {
  const {path} = useRouteMatch();

  const {canViewCompanies, canViewUsers} = usePermission();

  return (
    <Switch>
      {canViewCompanies && (
        <Route path={`${path}/${RoutesEnum.CompaniesManagement}`} exact>
          <Company />
        </Route>
      )}
      {canViewUsers && (
        <Route path={`${path}/${RoutesEnum.UserManagement}`} exact>
          <Account />
        </Route>
      )}
    </Switch>
  );
};

export default ManagementPage;
