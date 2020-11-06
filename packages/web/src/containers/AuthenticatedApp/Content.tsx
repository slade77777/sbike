import React from 'react';
import {Layout} from 'antd';
import {Route, Switch} from 'react-router-dom';
import Account from '../Account';

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
        <Route path="/account" exact>
          <Account />
        </Route>
        <Route path="/devices" exact>
          <div>Devices</div>
        </Route>
      </Switch>
    </Layout.Content>
  );
};

export default Content;
