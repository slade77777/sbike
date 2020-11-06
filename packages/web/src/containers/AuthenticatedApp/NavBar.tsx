import React from 'react';
import {DesktopOutlined, UserOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      collapsedWidth={50}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />}>
        <Link to="/account">Quản lý tài khoản</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        <Link to="/devices">Quản lý xe</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
