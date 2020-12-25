import React from 'react';
import {
  DashboardOutlined,
  PieChartOutlined,
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
import {ROUTES, RoutesEnum} from '../enum';

const NAVS = [
  {
    key: RoutesEnum.Tracking,
    icon: <DashboardOutlined />,
    route: '/',
    name: 'Giám sát',
    permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
  },
  {
    key: RoutesEnum.Devices,
    icon: <CarOutlined />,
    permissions: [],
  },
  // {
  //   key: 'management',
  //   route: '/quan-ly',
  //   icon: <PieChartOutlined />,
  //   title: 'Quản lý',
  //   subMenus: [
  //     {
  //       key: RoutesEnum.UserManagement,
  //       permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
  //     },
  //     {
  //       key: RoutesEnum.CompaniesManagement,
  //       permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
  //     },
  //   ],
  // },
  {
    key: 'report',
    icon: <LineChartOutlined />,
    route: '/bao-cao',
    title: 'Báo cáo',
    permissions: [PERMISSION_UPDATE_COMPANY, PERMISSION_GET_ALL_COMPANY],
    subMenus: [
      {
        key: RoutesEnum.AlertMovingReport,
        permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
      },
      {
        key: RoutesEnum.TurnOnOfReport,
        permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
      },
      {
        key: RoutesEnum.OverSpeedReport,
        permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
      },
      {
        key: RoutesEnum.InOutSafeZoneReport,
        permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
      },
    ],
  },
];

const Navigations = () => {
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      style={{position: 'relative'}}
      collapsedWidth={50}>
      {NAVS.map((nav) =>
        nav.subMenus ? (
          <Menu.SubMenu key={nav.key} icon={nav.icon} title={nav.title}>
            {nav.subMenus.map((sub) => (
              <Menu.Item key={sub.key}>
                <Link to={`${nav.route}/${ROUTES[sub.key].route}`}>
                  {ROUTES[sub.key].title}
                </Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={nav.key} icon={nav.icon}>
            <Link to={ROUTES[nav.key].route}>{ROUTES[nav.key].title}</Link>
          </Menu.Item>
        ),
      )}
    </Menu>
  );
};

export default Navigations;
