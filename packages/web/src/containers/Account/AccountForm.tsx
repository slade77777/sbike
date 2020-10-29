import React, {FC} from 'react';
import {Button, Form, Input, Row, Col} from 'antd';
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
    <Row justify="center" align="middle">
      <Col xs={24} sm={24} md={6} lg={4}>
        <Form
          name="add-user"
          className="add-new-form"
          initialValues={{userName: '', password: ''}}
          onFinish={addUser}>
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
              type="text"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Tạo mới
            </Button>
          </Form.Item>
          {isError && <div>{error?.message}</div>}
        </Form>
      </Col>
    </Row>
  );
};

export default AccountForm;
