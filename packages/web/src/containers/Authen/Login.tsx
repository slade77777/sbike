import React from 'react';
import {Form, Input, Button, Alert} from 'antd';
import {useMutation} from 'react-query';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {login, User} from 'shared-logic';
import {encrypt} from '../../utils/aesUtil';
import {useAuthState} from '../../context/auth-context';

const Login = () => {
  const [loginMutate, {isLoading, error, isError}] = useMutation(login);
  const {handleLoginSuccess} = useAuthState();

  const onFinish = async (values: User) => {
    const encryptedValues = {
      ...values,
      password: encrypt(values.password),
    };
    const dataLogin = await loginMutate(encryptedValues);
    if (dataLogin?.data?.session && dataLogin?.data?.errorCode === 0) {
      handleLoginSuccess(dataLogin?.data);
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
      {isError && <Alert message={error?.message} type="error" showIcon />}
    </Form>
  );
};

export default Login;
