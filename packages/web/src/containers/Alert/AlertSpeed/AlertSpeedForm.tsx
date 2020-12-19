import React from 'react';
import {Form, InputNumber, Button} from 'antd';

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14},
};

const buttonItemLayout = {
  wrapperCol: {span: 10, offset: 6},
};

const AlertSpeedForm = () => {
  const [form] = Form.useForm();
  return (
    <Form
      {...formItemLayout}
      layout="horizontal"
      form={form}
      onFinish={(values) => {
        console.log(values);
      }}>
      <Form.Item label="Vận tốc giới hạn" name="limitedSpeed">
        <InputNumber placeholder="Vận tốc giới hạn" width={100} />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">
          Đồng ý
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AlertSpeedForm;
