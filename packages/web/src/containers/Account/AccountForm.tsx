import React, {FC} from 'react';
import {Button, Form, Input} from 'antd';
import {User} from 'shared-logic';
import {LockOutlined, UserOutlined} from '@ant-design/icons';

type Props = {
  addUser: (user: User) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: {
    message?: string;
  };
};
const AccountForm: FC<Props> = ({
  addUser,
  isLoading = false,
  isError = false,
  error,
}) => {
  return (
    <Form
      name="add-user"
      className="add-new-form"
      initialValues={{userName: '', password: ''}}
      onFinish={addUser}>
      <Form.Item
        name="userName"
        rules={[{required: true, message: 'Bắt buộc'}]}>
        <Input
          allowClear
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nhập tài khoản"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{required: true, message: 'Bắt buộc'}]}>
        <Input
          allowClear
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="Nhập mật khẩu"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          Tạo mới
        </Button>
      </Form.Item>
      {isError && <div>{error?.message}</div>}
    </Form>
  );
};

export default AccountForm;
