import React, {FC, useEffect} from 'react';
import {Button, DatePicker, Form, Input} from 'antd';
import {Device} from 'shared-logic';

type Props = {
  initialValues: Device;
  onSubmit: (values: Device) => void;
};
const UpdateDevice: FC<Props> = ({onSubmit, initialValues}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <div>
      <Form
        labelCol={{span: 8}}
        form={form}
        wrapperCol={{span: 12}}
        layout="horizontal"
        onFinish={onSubmit}>
        <Form.Item name="carNumber" label="Biển số" shouldUpdate>
          <Input />
        </Form.Item>
        <Form.Item label="IMEI">{initialValues?.factoryID || 'N/A'}</Form.Item>
        <Form.Item label="Loại thiết bị">
          {initialValues?.deviceType || 'N/A'}
        </Form.Item>
        <Form.Item label="Thời gian hết hạn" name="expriedDate">
          <DatePicker />
        </Form.Item>
        <Form.Item name="companyID" label="Mã công ty">
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
          }}>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateDevice;
