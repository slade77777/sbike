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

const Navigations = () => {
  const NAVS = [
    {
      key: RoutesEnum.Tracking,
      icon: <DashboardOutlined />,
      route: '/',
      name: 'Giám sát',
      permissions: null,
    },
    {
      key: RoutesEnum.Devices,
      icon: <CarOutlined />,
      permissions: null,
    },
    {
      key: 'management',
      route: '/quan-ly',
      icon: <PieChartOutlined />,
      title: 'Quản lý',
      permissions: null,
      subMenus: [
        {
          key: RoutesEnum.UserManagement,
          permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
        },
        {
          key: RoutesEnum.CompaniesManagement,
          permissions: [PERMISSION_UPDATE_COMPANY, PERMISSION_GET_ALL_COMPANY],
        },
      ],
    },
    {
      key: 'report',
      icon: <LineChartOutlined />,
      route: '/bao-cao',
      title: 'Báo cáo',
      permissions: null,
      subMenus: [
        {
          key: RoutesEnum.AlertMovingReport,
          permissions: null,
        },
        {
          key: RoutesEnum.TurnOnOfReport,
          permissions: null,
        },
        {
          key: RoutesEnum.OverSpeedReport,
          permissions: null,
        },
        {
          key: RoutesEnum.InOutSafeZoneReport,
          permissions: null,
        },
      ],
    },
  ];

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
            {nav.subMenus.map((sub: any) => (
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
