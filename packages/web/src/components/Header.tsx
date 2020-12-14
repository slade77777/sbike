import React, {FC} from 'react';
import {Button, Dropdown, Layout, Menu} from 'antd';
import {useMutation} from 'react-query';
import {Link} from 'react-router-dom';
import {logout, useUserInfo} from 'shared-logic';
import {DownOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {useAuthState} from '../context/auth-context';

type Props = {
  title?: string;
};

const Header: FC<Props> = ({title = 'HỆ THỐNG GIÁM SÁT SBIKE'}) => {
  const {handleLogout} = useAuthState();
  const {data} = useUserInfo({
    onSuccess: (res) => {
      if (res.status === 401) {
        handleLogout();
      }
    },
    onError: () => {
      handleLogout();
    },
  });

  const [logoutMutation] = useMutation(logout, {
    onSuccess: () => {
      handleLogout();
    },
    onError: () => {
      handleLogout();
    },
  });

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/thong-tin-ca-nhan">
          <Button type="link" icon={<UserOutlined />}>
            Thông tin cá nhân
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Button
          type="link"
          icon={<LogoutOutlined />}
          onClick={async () => await logoutMutation()}>
          Đăng xuất
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout.Header className="l-header" style={{padding: '0 20px'}}>
      <h3>{title}</h3>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Xin chào: {data?.data?.userName || ''}
          <DownOutlined />
        </a>
      </Dropdown>
    </Layout.Header>
  );
};

export default Header;
