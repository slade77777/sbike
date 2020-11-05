import React, {useState} from 'react';
import './styles.css';
import {Layout, Menu} from 'antd';
import {DesktopOutlined, UserOutlined} from '@ant-design/icons';

import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Account from '../Account';

const {Header, Sider, Content} = Layout;

const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <BrowserRouter>
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          collapsible
          collapsed={collapsed}
          collapsedWidth={50}
          onCollapse={() => setCollapsed(!collapsed)}>
          <div className="logo">SBIKE</div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            collapsedWidth={50}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/account">Quản lý tài khoản</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/devices">Quản lý xe</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="l-header" style={{padding: '0 20px'}} />
          <Content
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
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default AuthenticatedApp;
