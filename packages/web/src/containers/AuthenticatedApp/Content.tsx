import React from 'react';
import {Layout} from 'antd';
import {Route, Switch} from 'react-router-dom';
import Account from '../Account';
import {Routes} from '../../enum';
import Profile from './Profile';
import DevicesList from '../DevicesList';

const Content = () => {
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
        <Route path={Routes.Tracking} exact>
          <DevicesList />
        </Route>
        <Route path={Routes.Devices} exact>
          <div>Devices</div>
        </Route>
        <Route path={Routes.UserManagement} exact>
          <Account />
        </Route>
        <Route path={Routes.CompaniesManagement} exact>
          <div>Company</div>
        </Route>
        <Route path={Routes.AlertMovingReport} exact>
          <div>Company</div>
        </Route>
        <Route path={Routes.TurnOnOfReport} exact>
          <div>Tat bat may</div>
        </Route>
        <Route path={Routes.OverSpeedReport} exact>
          <div>Qua toc do</div>
        </Route>
        <Route path={Routes.InOutSafeZoneReport} exact>
          <div>InOutSafeZoneReport</div>
        </Route>
        <Route path="/thong-tin-ca-nhan">
          <Profile />
        </Route>
      </Switch>
    </Layout.Content>
  );
};

export default Content;
