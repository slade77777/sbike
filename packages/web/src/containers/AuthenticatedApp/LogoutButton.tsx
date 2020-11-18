import React, {FC} from 'react';
import {Button} from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import {useAuthState} from '../../context/auth-context';

const LogoutButton: FC = () => {
  const {onLogout} = useAuthState();

  return (
    <div>
      <Button
        type="link"
        icon={<LogoutOutlined />}
        onClick={onLogout}
        loading={false}>
        Đăng xuất
      </Button>
    </div>
  );
};

export default LogoutButton;
