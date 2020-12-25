import React, {FC} from 'react';
import {Button} from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import {useAuthState} from '../../context/auth-context';

const Logout: FC<{hideText?: boolean}> = ({hideText = false}) => {
  const {onLogout} = useAuthState();

  return (
    <Button type="link" block icon={<LogoutOutlined />} onClick={onLogout}>
      {hideText ? '' : 'Đăng xuất'}
    </Button>
  );
};

export default Logout;
