import React, {FC} from 'react';
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
import {useAuthState} from '../context/auth-context';
import {
  canShowManagementMenu,
  checkMatchingPermissions,
} from '../utils/checkPermission';

type NavType = {
  id: string;
  icon?: React.ReactNode;
  route: string;
  name: string;
  permissions?: Array<string>;
  subMenus?: SubMenuType[];
};

type SubMenuType = {
  subId: string;
  route: string;
  name: string;
  permissions?: Array<string>;
};

const NAVS = [
  {
    id: 'tracking',
    icon: <DashboardOutlined />,
    route: '/giam-sat',
    name: 'Giám sát',
    permissions: [],
  },
  {
    id: 'devices',
    route: '/thiet-bi',
    name: 'Thiết bị',
    icon: <CarOutlined />,
    permissions: [],
  },
  {
    id: 'management',
    route: '/quan-ly',
    icon: <PieChartOutlined />,
    name: 'Quản lý',
    permissions: [],
    subMenus: [
      {
        subId: 'user-management',
        route: '/nguoi-dung',
        name: 'Quản lý người dùng',
        permissions: [PERMISSION_UPDATE_USER, PERMISSION_MANAGER_USER],
      },
      {
        subId: 'companies-management',
        route: '/cong-ty',
        name: 'Quản lý công ty',
        permissions: [PERMISSION_UPDATE_COMPANY, PERMISSION_GET_ALL_COMPANY],
      },
    ],
  },
  {
    id: 'report',
    icon: <LineChartOutlined />,
    route: '/bao-cao',
    name: 'Báo cáo',
    permissions: [],
    subMenus: [
      {
        subId: 'alert-moving-report',
        route: '/0',
        name: 'Cảnh báo di chuyển',
        permissions: [],
      },
      {
        subId: 'speed-report',
        route: '/1',
        permissions: [],
        name: 'Quá tốc độ',
      },
      {
        subId: 'turn-on-of-report',
        route: '/2',
        name: 'Tắt/Bật máy',
        permissions: [],
      },
      {
        subId: 'safe-zone-report',
        route: '/3',
        permissions: [],
        name: 'Vào/Ra vùng an toàn',
      },
    ],
  },
];

const CustomSubMenu: FC<NavType> = ({
  id,
  route,
  icon,
  name,
  subMenus,
  ...props
}) => {
  const {userInfo} = useAuthState();
  if (
    id === 'management' &&
    !canShowManagementMenu(userInfo?.permission || [])
  ) {
    return null;
  }

  if (subMenus) {
    return (
      <Menu.SubMenu icon={icon} title={name} {...props}>
        {subMenus.map(
          (sub: SubMenuType) =>
            checkMatchingPermissions(
              sub.permissions || [],
              userInfo?.permission || [],
            ) && (
              <Menu.Item key={sub.subId}>
                <Link to={`${route}${sub.route}`}>{sub.name}</Link>
              </Menu.Item>
            ),
        )}
      </Menu.SubMenu>
    );
  }
  return (
    <Menu.Item icon={icon} {...props}>
      <Link to={route}>{name}</Link>
    </Menu.Item>
  );
};

const Navigations = () => {
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      style={{position: 'relative'}}
      collapsedWidth={50}>
      {NAVS.map((nav) => (
        <CustomSubMenu {...nav} key={nav.id} />
      ))}
    </Menu>
  );
};

export default Navigations;
