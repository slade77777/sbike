import React, {FC} from 'react';
import {Form, InputNumber, Button} from 'antd';

const formItemLayout = {
  labelCol: {span: 9},
  wrapperCol: {span: 15},
};

const buttonItemLayout = {
  wrapperCol: {span: 10, offset: 9},
};

type Props = {
  onSubmit: (values: {limitedSpeed: number}) => void;
  isLoading?: boolean;
};
const AlertSpeedForm: FC<Props> = ({onSubmit, isLoading}) => {
  const [form] = Form.useForm();
  return (
    <Form
      {...formItemLayout}
      layout="horizontal"
      form={form}
      onFinish={onSubmit}>
      <Form.Item label="Thiết lập mới" name="limitedSpeed">
        <InputNumber placeholder="Vận tốc giới hạn" style={{width: '100%'}} />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Đồng ý
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AlertSpeedForm;
