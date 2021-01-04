import React from 'react';
import {
  DashboardOutlined,
  PieChartOutlined,
  CarOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import usePermission from '../hooks/usePermission';

type NavType = {
  id: string;
  icon?: React.ReactNode;
  route: string;
  name: string;
  available?: boolean;
  subMenus?: SubMenuType[];
};

type SubMenuType = {
  subId: string;
  route: string;
  name: string;
  available?: boolean;
};

const Navigations = () => {
  const {isAdmin, canViewCompanies, canViewUsers} = usePermission();
  console.log(isAdmin, canViewCompanies, canViewUsers);
  const NAVS: NavType[] = [
    {
      id: 'tracking',
      icon: <DashboardOutlined />,
      route: '/giam-sat',
      name: 'Giám sát',
      available: true,
    },
    {
      id: 'devices',
      route: '/thiet-bi',
      name: 'Thiết bị',
      icon: <CarOutlined />,
      available: true,
    },
    {
      id: 'management',
      route: '/quan-ly',
      icon: <PieChartOutlined />,
      name: 'Quản lý',
      available: isAdmin,
      subMenus: [
        {
          subId: 'user-management',
          route: '/nguoi-dung',
          name: 'Quản lý người dùng',
          available: isAdmin || canViewUsers,
        },
        {
          subId: 'companies-management',
          route: '/cong-ty',
          name: 'Quản lý công ty',
          available: isAdmin || canViewCompanies,
        },
      ],
    },
    {
      id: 'report',
      icon: <LineChartOutlined />,
      route: '/bao-cao',
      name: 'Báo cáo',
      available: true,
      subMenus: [
        {
          subId: 'alert-moving-report',
          route: '/0',
          name: 'Cảnh báo di chuyển',
          available: true,
        },
        {
          subId: 'speed-report',
          route: '/1',
          name: 'Quá tốc độ',
          available: true,
        },
        {
          subId: 'turn-on-of-report',
          route: '/2',
          name: 'Tắt/Bật máy',
          available: true,
        },
        {
          subId: 'safe-zone-report',
          route: '/3',
          available: true,
          name: 'Vào/Ra vùng an toàn',
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
      {NAVS.map((nav) => {
        const {subMenus, icon, name, route, id} = nav;
        if (!nav.available) {
          return null;
        }
        if (subMenus) {
          return (
            <Menu.SubMenu icon={icon} title={name} key={id}>
              {subMenus.map(
                (sub: SubMenuType) =>
                  sub.available && (
                    <Menu.Item key={sub.subId}>
                      <Link to={`${route}${sub.route}`}>{sub.name}</Link>
                    </Menu.Item>
                  ),
              )}
            </Menu.SubMenu>
          );
        }
        return (
          <Menu.Item icon={icon} key={id}>
            <Link to={route}>{name}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default Navigations;
