import React, {useState, Suspense} from 'react';
import {Layout, Spin} from 'antd';
import {BrowserRouter} from 'react-router-dom';
import '../styles/main.scss';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Navigations from '../components/Navigations';
import Routes from '../Routes';

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
          onCollapse={() => setCollapsed(!collapsed)}>
          <Logo status={collapsed ? 'small' : 'large'} />
          <Navigations />
        </Layout.Sider>
        <Layout className="site-layout">
          <Header />
          <Suspense fallback={<Spin />}>
            <Routes />
          </Suspense>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default AuthenticatedApp;
