import React, {FC} from 'react';
import {Button} from 'antd';
import {LogoutOutlined} from '@ant-design/icons';

const LogoutButton: FC = () => {
  return (
    <div>
      <Button type="link" icon={<LogoutOutlined />}>
        Đăng xuất
      </Button>
    </div>
  );
};

export default LogoutButton;
