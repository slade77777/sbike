import React, {useState, Suspense} from 'react';
import {Layout, Spin} from 'antd';
import {BrowserRouter} from 'react-router-dom';
import '../styles/main.scss';
import Logo from '../components/Logo';
import Navigations from '../components/Navigations';
import Routes from '../Routes';
import useFirebaseMessaging from '../hooks/useFirebaseMessaging';
import HelloUser from './Authen/HelloUser';

const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  useFirebaseMessaging();

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
