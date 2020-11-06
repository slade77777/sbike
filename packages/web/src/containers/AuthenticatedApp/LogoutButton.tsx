import React, {FC} from 'react';
import {useMutation} from 'react-query';
import {Button} from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import {logout} from 'shared-logic';
import {useAuthState} from '../../context/auth-context';

const LogoutButton: FC = () => {
  const {setIsAuth} = useAuthState();
  const [logoutMutate, {isLoading, isSuccess, isError, error}] = useMutation(
    logout,
  );

  async function handleLogOut() {
    try {
      const res = await logoutMutate();
      localStorage.removeItem('session');
      setIsAuth(false);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

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
