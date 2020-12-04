import React, {useState, Suspense} from 'react';
import {Layout, Spin} from 'antd';
import {BrowserRouter} from 'react-router-dom';
import {useMutation} from 'react-query';
import {LoadScript} from '@react-google-maps/api';
import {logout, useUserInfo} from 'shared-logic';
import '../styles/main.scss';
import Logo from '../components/Logo';
import {useAuthState} from '../context/auth-context';
import Header from '../components/Header';
import Navigations from '../components/Navigations';
import Routes from '../Routes';

const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {handleLogout} = useAuthState();

  const {data} = useUserInfo({
    onSuccess: (res) => {
      if (res.status === 401) {
        handleLogout();
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [logoutMutation] = useMutation(logout, {
    onSuccess: () => {
      handleLogout();
    },
  });

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
          <Header
            onLogout={async () => await logoutMutation()}
            userDisplayName={data?.data?.userName || ''}
          />
          <Suspense fallback={<Spin />}>
            <LoadScript
              googleMapsApiKey={
                process.env.GOOGLE_MAPS_KEY ||
                'AIzaSyDjgghF4mwFy-wsFzQnlTYpnbMJXEqIlNg'
              }>
              <Routes />
            </LoadScript>
          </Suspense>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default AuthenticatedApp;
