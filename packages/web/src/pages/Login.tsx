import React from 'react';
import {useMutation} from 'react-query';
import {Form, Input, Button, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {login, User} from 'shared-logic';
import {encrypt} from '../utils/aesUtil';
import {useAuthState} from '../context/auth-context';

const Login = () => {
  const {onLoginSuccess} = useAuthState();
  const [loginMutate, {isLoading, isError}] = useMutation(login);

  const onFinish = async (values: User) => {
    try {
      const dataLogin = await loginMutate({
        ...values,
        password: encrypt(values.password),
      });
      if (dataLogin?.data?.session) {
        onLoginSuccess(dataLogin?.data?.session);
      }
    } catch (err) {
      message.error('Đăng nhập không thành công!');
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{userName: '', password: ''}}
      onFinish={onFinish}>
      <Form.Item
        name="userName"
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
      {isError && <div>{'Something went wrong'}</div>}
    </Form>
  );
};

export default Login;
