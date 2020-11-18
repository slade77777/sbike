import React from 'react';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {User} from 'shared-logic';
import {encrypt} from '../utils/aesUtil';
import {useAuthState} from '../context/auth-context';
// import {ACTION_ERROR} from '../contants/common';

const Login = () => {
  const {onLogin, loginLoading} = useAuthState();
  // const [loginMutate, {isLoading, isError}] = useMutation(login);

  const onFinish = async (values: User) => {
    onLogin({
      ...values,
      password: encrypt(values.password),
    });
    // try {
    //   const dataLogin = await loginMutate();
    //   if (dataLogin?.data?.session && dataLogin?.data?.errorCode === 0) {
    //     onLoginSuccess(dataLogin?.data?.session);
    //   } else if (dataLogin?.data?.errorCode === 1) {
    //     message.error(dataLogin?.data?.message);
    //   }
    // } catch (err) {
    //   message.error(ACTION_ERROR);
    // }
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
        <Button type="primary" htmlType="submit" block loading={loginLoading}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
