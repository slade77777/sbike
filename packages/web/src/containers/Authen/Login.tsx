import React from 'react';
import {Form, Input, Button, Alert} from 'antd';
import {useMutation} from 'react-query';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {getDeviceByCompany, login, User, UserResponse} from 'shared-logic';
import {encrypt} from '../../utils/aesUtil';
import {useAuthState} from '../../context/auth-context';

const Login = () => {
  const {handleLoginSuccess} = useAuthState();
  const {mutate, isError, isLoading, error} = useMutation<
    UserResponse,
    {
      message: string;
    }
  >(login, {
    onSuccess: async (data) => {
      if (data.session && data.errorCode === 0) {
        handleLoginSuccess(data);
        getDeviceByCompany('', data?.user.companyID || '');
      }
    },
  });

  const onFinish = (values: User) => {
    const encryptedValues = {
      ...values,
      password: encrypt(values.password),
    };
    mutate(encryptedValues);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{userName: '', password: ''}}
      onFinish={onFinish}>
      <Form.Item
        name="userName"
        rules={[{required: true, message: 'Chưa nhập tên đăng nhập'}]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{required: true, message: 'Chưa nhập mật khẩu'}]}>
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
