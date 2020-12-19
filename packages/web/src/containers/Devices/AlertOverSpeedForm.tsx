import React from 'react';
import {Form, Input, Button} from 'antd';

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 14},
};

const buttonItemLayout = {
  wrapperCol: {span: 14, offset: 4},
};

const AlertOverSpeedForm = () => {
  const [form] = Form.useForm();
  return (
    <Form {...formItemLayout} layout="horizontal" form={form}>
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default AlertOverSpeedForm;
