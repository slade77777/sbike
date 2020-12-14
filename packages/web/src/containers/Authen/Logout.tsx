import React, {FC} from 'react';
import {Button} from 'antd';
import {useMutation} from 'react-query';
import {LogoutOutlined} from '@ant-design/icons';
import {logout} from 'shared-logic';
import {useAuthState} from '../../context/auth-context';

const Logout: FC<{hideText?: boolean}> = ({hideText = false}) => {
  const {handleLogout} = useAuthState();

  const [logoutMutation] = useMutation(logout, {
    onSuccess: () => {
      handleLogout();
    },
    onError: () => {
      handleLogout();
    },
  });

  return (
    <Button
      type="link"
      block
      icon={<LogoutOutlined />}
      onClick={async () => await logoutMutation()}>
      {hideText ? '' : 'Đăng xuất'}
    </Button>
  );
};

export default Logout;
