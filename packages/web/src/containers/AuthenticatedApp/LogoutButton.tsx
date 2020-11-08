import React, {FC} from 'react';
import {useMutation} from 'react-query';
import {Button, message} from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import {logout} from 'shared-logic';
import {useAuthState} from '../../context/auth-context';

const LogoutButton: FC = () => {
  const {onLogoutSuccess} = useAuthState();
  const [logoutMutate, {isLoading}] = useMutation(logout);

  const handleLogOut = async () => {
    try {
      const res = await logoutMutate();
      if (res?.data?.isCompleted) {
        onLogoutSuccess();
      } else if (res?.status === 401) {
        onLogoutSuccess();
      }
    } catch (e) {
      message.error('Lỗi không thể đăng xuất');
    }
  };

  return (
    <div>
      <Button
        type="link"
        icon={<LogoutOutlined />}
        onClick={handleLogOut}
        loading={isLoading}>
        Đăng xuất
      </Button>
    </div>
  );
};

export default LogoutButton;
