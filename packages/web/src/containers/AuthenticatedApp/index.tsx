import React, {useState} from 'react';
import './styles.scss';
import {Layout} from 'antd';
import {BrowserRouter} from 'react-router-dom';
import Logo from '../../components/Logo';
import NavBar from './NavBar';
import Header from './Header';
import Content from './Content';

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
          <NavBar />
        </Layout.Sider>
        <Layout className="site-layout">
          <Header />
          <Content />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default AuthenticatedApp;
