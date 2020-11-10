import React from 'react';
import {
  DashboardOutlined,
  PieChartOutlined,
  BuildOutlined,
  UserAddOutlined,
  CarOutlined,
  LineChartOutlined,
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
    key: 'tracking',
    icon: <DashboardOutlined />,
    route: '/',
    name: 'Giám sát',
    permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
  },
  {
    key: 'devices',
    icon: <CarOutlined />,
    route: '/devices',
    name: 'Danh sách thiết bị',
    permissions: [],
  },
  {
    key: 'management',
    subMenus: [
      {
        key: 'accounts',
        route: '/accounts',
        name: 'Quản lý tài khoản',
        permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
      },
      {
        key: 'companies',
        route: '/companies',
        name: 'Quản lý công ty',
        permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
      },
    ],
  },
  {
    key: 'report',
    icon: <LineChartOutlined />,
    route: '/report',
    name: 'Báo cáo',
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
      {NAVS.map((nav) =>
        nav.subMenus ? (
          <Menu.SubMenu key="sub1" icon={<PieChartOutlined />} title="Quản lý">
            {nav.subMenus.map((sub) => (
              <Menu.Item key={sub.key}>
                <Link to={sub.route}>{sub.name}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={nav.key} icon={nav.icon}>
            <Link to={nav.route}>{nav.name}</Link>
          </Menu.Item>
        ),
      )}
    </Menu>
  );
};

export default NavBar;
