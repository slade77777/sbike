import React, {FC} from 'react';
import {Button, Form, Input} from 'antd';
import {encrypt} from '../../utils/aesUtil';

type Props = {
  onSubmit: (vl: any) => void;
  isLoading?: boolean;
};
const ChangePasswordForm: FC<Props> = ({onSubmit, isLoading}) => {
  function onChangePass(vl: {password: string; confirm: string}) {
    onSubmit?.(encrypt(vl.password));
  }

  return (
    <Form
      onFinish={onChangePass}
      labelCol={{span: 8}}
      wrapperCol={{
        span: 16,
      }}>
      <Form.Item
        name="password"
        label="Mật khẩu mới"
        rules={[
          {
            required: true,
            message: 'Nhập mật khẩu mới',
          },
        ]}
        hasFeedback>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Nhập lại mật khẩu"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Chưa nhập mật khẩu',
          },
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Không khớp với mật khẩu đã nhập');
            },
          }),
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{span: 8, offset: 8}}>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
