import React, {FC} from 'react';
import {Button} from 'antd';
import {useMutation} from 'react-query';
import {logout} from 'shared-logic';
import {LogoutOutlined} from '@ant-design/icons';
import {useAuthState} from '../../context/auth-context';

const LogoutButton: FC = () => {
  const {handleLogout} = useAuthState();

  const [logoutMutation, {isLoading}] = useMutation(logout, {
    onSuccess: () => {
      handleLogout();
    },
  });

  return (
    <div>
      <Button
        type="link"
        icon={<LogoutOutlined />}
        onClick={async () => await logoutMutation()}
        loading={isLoading}>
        Đăng xuất
      </Button>
    </div>
  );
};

export default LogoutButton;
