import React from 'react';
import {
  DashboardOutlined,
  BuildOutlined,
  UserAddOutlined,
  CarOutlined,
} from '@ant-design/icons';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import {
  PERMISSION_GET_ALL_COMPANY,
  PERMISSION_MANAGER_USER,
  PERMISSION_UPDATE_COMPANY,
  PERMISSION_UPDATE_USER,
} from 'shared-logic';

const NAVS = [
  {
    key: '1',
    icon: <DashboardOutlined />,
    route: '/',
    name: 'Dashboard',
    permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
  },
  {
    key: '2',
    icon: <UserAddOutlined />,
    route: '/account',
    name: 'Quản lý tài khoản',
    permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
  },
  {
    key: '3',
    icon: <CarOutlined />,
    route: '/devices',
    name: 'Quản lý thiết bị',
    permissions: [],
  },
  {
    key: '4',
    icon: <BuildOutlined />,
    route: '/company',
    name: 'Quản lý công ty',
    permissions: [PERMISSION_UPDATE_COMPANY, PERMISSION_GET_ALL_COMPANY],
  },
];

const NavBar = () => {
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      collapsedWidth={50}>
      {NAVS.map((nav) => (
        <Menu.Item key={nav.key} icon={nav.icon}>
          <Link to={nav.route}>{nav.name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default NavBar;
