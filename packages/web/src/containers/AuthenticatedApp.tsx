import React, {useState, Suspense} from 'react';
import {Layout, Spin} from 'antd';
import {BrowserRouter} from 'react-router-dom';
import '../styles/main.scss';
import Logo from '../components/Logo';
import Navigations from '../components/Navigations';
import Routes from '../Routes';
import HelloUser from './Authen/HelloUser';
import Logout from './Authen/Logout';

const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <Layout style={{minHeight: '100vh'}}>
        <Layout.Sider
          collapsible
          collapsed={collapsed}
          collapsedWidth={50}
          width={250}
          style={{
            position: 'relative',
            zIndex: 10,
          }}
          onCollapse={() => setCollapsed(!collapsed)}>
          <Logo status={collapsed ? 'small' : 'large'} />
          {!collapsed && <HelloUser />}
          <Navigations />
          <div
            style={{
              position: 'absolute',
              bottom: 80,
              padding: '0 10px',
              width: '100%',
            }}>
            <Logout hideText={collapsed} />
          </div>
        </Layout.Sider>
        <Layout className="site-layout">
          <Suspense fallback={<Spin />}>
            <Routes />
          </Suspense>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default AuthenticatedApp;
