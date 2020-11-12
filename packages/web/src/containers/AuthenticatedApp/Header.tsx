import React, {FC} from 'react';
import {Button, Dropdown, Layout, Menu} from 'antd';
import {useUserInfo} from 'shared-logic';
import {Link} from 'react-router-dom';
import {DownOutlined, UserOutlined} from '@ant-design/icons';
import LogoutButton from './LogoutButton';

type Props = {
  title?: string;
};

const Header: FC<Props> = ({title = 'HỆ THỐNG GIÁM SÁT SBIKE'}) => {
  const {data} = useUserInfo();
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
        <LogoutButton />
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout.Header className="l-header" style={{padding: '0 20px'}}>
      <h3>{title}</h3>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Xin chào: {data?.data?.fullName || data?.data?.userName || ''}{' '}
          <DownOutlined />
        </a>
      </Dropdown>
    </Layout.Header>
  );
};

export default Header;
