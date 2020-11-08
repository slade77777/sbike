import React, {FC} from 'react';
import {v4 as uuidv4} from 'uuid';
import {Button, Checkbox, Col, Form, Input, Row, Select} from 'antd';
import {ROLES, User} from 'shared-logic';
import {LockOutlined, UserOutlined, MobileOutlined} from '@ant-design/icons';

type Props = {
  addUser: (user: User) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: {
    message?: string;
  };
  updatingUser?: User | null;
};

const AccountForm: FC<Props> = ({
  addUser,
  isLoading = false,
  isError = false,
  error,
  updatingUser,
}) => {
  return (
    <Form
      name="add-user"
      className="add-new-form"
      initialValues={updatingUser ? updatingUser : {userName: '', password: ''}}
      layout="horizontal"
      onFinish={addUser}>
      <Form.Item
        name="fullName"
        rules={[{required: false, message: 'Chưa nhập họ và tên'}]}>
        <Input
          allowClear
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Họ tên"
        />
      </Form.Item>
      <Form.Item
        name="userName"
        rules={[{required: true, message: 'Chưa nhập tên đăng nhập'}]}>
        <Input
          allowClear
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Tên đăng nhập"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{required: true, message: 'Chưa nhập mật khẩu'}]}>
        <Input
          allowClear
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Nhập mật khẩu"
        />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        rules={[{required: false, message: 'Chưa điền số điện thoại'}]}>
        <Input
          allowClear
          inputMode="tel"
          prefix={<MobileOutlined className="site-form-item-icon" />}
          placeholder="Số điện thoại"
        />
      </Form.Item>
      <Form.Item
        name="companyID"
        rules={[{required: true, message: 'Chưa chọn công ty!'}]}>
        <Select placeholder="Chọn công ty">
          <Select.Option value={uuidv4()}>Apple</Select.Option>
          <Select.Option value={uuidv4()}>Google</Select.Option>
          <Select.Option value={uuidv4()}>Microsoft</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="permission"
        label="Phân quyền"
        labelCol={{span: 24}}
        rules={[{required: true, message: 'Chưa chọn quyền'}]}>
        <Checkbox.Group>
          <Row>
            {ROLES.map((role) => (
              <Col span={24} key={role.name}>
                <Checkbox value={role.name} style={{lineHeight: '32px'}}>
                  {role.label}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          {updatingUser ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </Form.Item>
      {isError && <div>{error?.message}</div>}
    </Form>
  );
};

export default AccountForm;
