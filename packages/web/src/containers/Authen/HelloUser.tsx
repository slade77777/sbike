import React from 'react';
import styled from 'styled-components';
import {Menu, Dropdown} from 'antd';
import {CaretDownOutlined} from '@ant-design/icons';
import {useAuthState} from '../../context/auth-context';
import Logout from './Logout';
import ChangedPassword from './ChangedPassword';

const HelloUser = () => {
  const {userInfo} = useAuthState();

  const menu = (
    <Menu>
      <Menu.Item>
        <ChangedPassword />
      </Menu.Item>
      <Menu.Item>
        <Logout />
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledText>
      <Dropdown overlay={menu}>
        <div>
          Xin chào:{' '}
          <a>
            {userInfo?.fullName || userInfo?.userName || ''}{' '}
            <CaretDownOutlined />
          </a>
        </div>
      </Dropdown>
    </StyledText>
  );
};

const StyledText = styled.h4`
  text-align: center;
  color: #ffffff;
  padding: 10px 0;
`;

export default HelloUser;
