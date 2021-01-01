import React from 'react';
import {Layout} from 'antd';
import {Redirect, Route, Switch} from 'react-router-dom';
import {RoutesEnum} from '../enum';
const TrackingPage = React.lazy(() => import('../pages/TrackingPage'));
const ProfilePage = React.lazy(() => import('../pages/ProfilePage'));
const DevicePage = React.lazy(() => import('../pages/DevicePage'));
const ManagementPage = React.lazy(() => import('../pages/ManagementPage'));
const ReportPage = React.lazy(() => import('../pages/ReportPage'));

const Routes = () => {
  return (
    <Layout.Content className="site-layout-background">
      <Switch>
        <Route path="/" exact>
          <Redirect to={RoutesEnum.Tracking} />
        </Route>
        <Route path={RoutesEnum.Tracking}>
          <TrackingPage />
        </Route>
        <Route path={RoutesEnum.Devices}>
          <DevicePage />
        </Route>
        <Route path={RoutesEnum.Management}>
          <ManagementPage />
        </Route>
        <Route path={`/bao-cao`}>
          <ReportPage />
        </Route>
        <Route path="/thong-tin-ca-nhan">
          <ProfilePage />
        </Route>
      </Switch>
    </Layout.Content>
  );
};

export default Routes;
