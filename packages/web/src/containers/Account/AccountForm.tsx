import React, {FC} from 'react';
// import {v4 as uuidv4} from 'uuid';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Switch,
} from 'antd';
import {AccountAction, createOrUpdateUser, ROLES, User} from 'shared-logic';
import {useMutation} from 'react-query';
import {decrypt, encrypt} from '../../utils/aesUtil';
import {ACTION_ERROR, ACTION_SUCCESS} from '../../contants/common';

type Props = {
  onSuccess?: (type: AccountAction, data?: User) => void;
  onError?: () => void;
  updatingUser?: User | null;
};

const AccountForm: FC<Props> = ({onSuccess, onError, updatingUser}) => {
  const createOrUpdateMutate = useMutation(createOrUpdateUser);

  const handleCreatingOrUpdatingUser = async (values: User) => {
    const params = {
      ...values,
      password: encrypt(values.password),
    };
    const res = await createOrUpdateMutate.mutateAsync({
      params,
      type: updatingUser ? AccountAction.UPDATE : AccountAction.INSERT,
    });

    if (res?.status === 200) {
      if (updatingUser) {
        onSuccess?.(AccountAction.INSERT, values);
      } else {
        onSuccess?.(AccountAction.UPDATE);
      }
      message.success(ACTION_SUCCESS);
    } else {
      onError?.();
      message.error(ACTION_ERROR);
    }
  };

  return (
    <Form
      name="add-user"
      className="add-new-form"
      {...{labelCol: {span: 6}}}
      initialValues={
        updatingUser
          ? {
              ...updatingUser,
              password: decrypt(updatingUser.password),
            }
          : {userName: '', password: ''}
      }
      layout="horizontal"
      onFinish={handleCreatingOrUpdatingUser}>
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
        <Input allowClear type="text" placeholder="Nhập mật khẩu" />
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
          <Select.Option value="53680">SBIKE</Select.Option>
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
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={createOrUpdateMutate.isLoading}>
          {updatingUser ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountForm;
