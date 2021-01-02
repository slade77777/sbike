import React from 'react';
import {KeyOutlined} from '@ant-design/icons';
import {Button} from 'antd';

const ChangedPassword = () => {
  return (
    <Button type="link" block icon={<KeyOutlined />}>
      Đổi mật khẩu
    </Button>
  );
};

export default ChangedPassword;
