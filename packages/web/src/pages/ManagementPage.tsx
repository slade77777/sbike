import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import {RoutesEnum} from '../enum';
import {useAuthState} from '../context/auth-context';
import {
  hasCompanyPermission,
  hasUserPermission,
} from '../utils/checkPermission';

const Account = React.lazy(() => import('../containers/Account'));
const Company = React.lazy(() => import('../containers/Company'));

const ManagementPage = () => {
  const {path} = useRouteMatch();
  const {userInfo} = useAuthState();

  return (
    <Switch>
      {hasCompanyPermission(userInfo?.permission || []) && (
        <Route path={`${path}/${RoutesEnum.CompaniesManagement}`} exact>
          <Company />
        </Route>
      )}
      {hasUserPermission(userInfo?.permission || []) && (
        <Route path={`${path}/${RoutesEnum.UserManagement}`} exact>
          <Account />
        </Route>
      )}
    </Switch>
  );
};

export default ManagementPage;
