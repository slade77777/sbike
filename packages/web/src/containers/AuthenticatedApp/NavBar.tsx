import React from 'react';
import {
  DashboardOutlined,
  BuildOutlined,
  UserAddOutlined,
  CarOutlined,
} from '@ant-design/icons';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      collapsedWidth={50}>
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to="/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserAddOutlined />}>
        <Link to="/account">Quản lý tài khoản</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<CarOutlined />}>
        <Link to="/devices">Quản lý xe</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<BuildOutlined />}>
        <Link to="/company">Quản lý công ty</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
