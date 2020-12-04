import React from 'react';
import {Layout} from 'antd';
import {Route, Switch} from 'react-router-dom';
import {RoutesEnum} from '../enum';
import TrackingPage from '../pages/TrackingPage';
import ProfilePage from '../pages/ProfilePage';
import DevicePage from '../pages/DevicePage';
import ManagementPage from '../pages/ManagementPage';
import ReportPage from '../pages/ReportPage';

const Routes = () => {
  return (
    <Layout.Content
      className="site-layout-background"
      style={{
        padding: 24,
        height: '100%',
      }}>
      <Switch>
        <Route path="/" exact>
          <div>Dashboard</div>
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
