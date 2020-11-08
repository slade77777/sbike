import React, {FC} from 'react';
import {v4 as uuidv4} from 'uuid';
import {Button, Checkbox, Col, Form, Input, Row, Select, Switch} from 'antd';
import {ROLES, User} from 'shared-logic';

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
      {...{labelCol: {span: 6}}}
      initialValues={updatingUser ? updatingUser : {userName: '', password: ''}}
      layout="horizontal"
      onFinish={addUser}>
      <Form.Item
        label="Họ và tên"
        name="fullName"
        wrapperCol={{span: 16}}
        rules={[{required: false, message: 'Chưa nhập họ và tên'}]}>
        <Input allowClear placeholder="Họ tên" />
      </Form.Item>
      <Form.Item
        label="Tên đăng nhập"
        name="userName"
        wrapperCol={{span: 16}}
        rules={[{required: true, message: 'Chưa nhập tên đăng nhập'}]}>
        <Input allowClear placeholder="Tên đăng nhập" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Mật khẩu"
        wrapperCol={{span: 16}}
        rules={[{required: true, message: 'Chưa nhập mật khẩu'}]}>
        <Input allowClear type="password" placeholder="Nhập mật khẩu" />
      </Form.Item>
      <Form.Item
        wrapperCol={{span: 8}}
        label="Số điện thoại"
        name="phoneNumber"
        rules={[{required: false, message: 'Chưa điền số điện thoại'}]}>
        <Input allowClear inputMode="tel" placeholder="Số điện thoại" />
      </Form.Item>
      <Form.Item
        wrapperCol={{span: 16}}
        name="companyID"
        label="Công ty"
        rules={[{required: true, message: 'Chưa chọn công ty!'}]}>
        <Select placeholder="Chọn công ty">
          <Select.Option value={uuidv4()}>Apple</Select.Option>
          <Select.Option value={uuidv4()}>Google</Select.Option>
          <Select.Option value={uuidv4()}>Microsoft</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Trạng thái" name="active">
        <Switch />
      </Form.Item>

      <Form.Item
        name="permission"
        label="Phân quyền"
        wrapperCol={{span: 16}}
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

      <Form.Item wrapperCol={{span: 8, offset: 8}}>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          {updatingUser ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </Form.Item>
      {isError && <div>{error?.message}</div>}
    </Form>
  );
};

export default AccountForm;
