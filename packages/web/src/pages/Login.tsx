import React from 'react';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useAuthState} from '../context/auth-context';

const Login = () => {
  const {login, isLoading, error, isError} = useAuthState();
  const onFinish = (values: any) => {
    login(values);
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{username: '', password: ''}}
      onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{required: true, message: 'Please input your Username!'}]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{required: true, message: 'Please input your Password!'}]}>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          Log in
        </Button>
      </Form.Item>
      {isError && <div>{error?.message}</div>}
    </Form>
  );
};

export default Login;
