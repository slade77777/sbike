import React, {Suspense} from 'react';
import {Spin} from 'antd';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import {RoutesEnum} from '../enum';

const Account = React.lazy(() => import('../containers/Account'));
const Company = React.lazy(() => import('../containers/Company'));

const ManagementPage = () => {
  const {path} = useRouteMatch();
  return (
    <Suspense fallback={<Spin />}>
      <Switch>
        <Route path={`${path}/${RoutesEnum.CompaniesManagement}`} exact>
          <Company />
        </Route>
        <Route path={`${path}/${RoutesEnum.UserManagement}`} exact>
          <Account />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default ManagementPage;
