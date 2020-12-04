import React, {FC} from 'react';
import {Button, Dropdown, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import {DownOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';

type Props = {
  title?: string;
  userDisplayName: string;
  onLogout: () => void;
};

const Header: FC<Props> = ({
  userDisplayName,
  onLogout,
  title = 'HỆ THỐNG GIÁM SÁT SBIKE',
}) => {
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
        <Button type="link" icon={<LogoutOutlined />} onClick={onLogout}>
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
          Xin chào: {userDisplayName}
          <DownOutlined />
        </a>
      </Dropdown>
    </Layout.Header>
  );
};

export default Header;
