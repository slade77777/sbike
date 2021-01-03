import React, {FC} from 'react';
import {Company} from 'shared-logic';
import {Button, Form, Input} from 'antd';
import CompaniesDropDown from './CompaniesDropDown';

type Props = {
  onSubmit?: (company: Company) => void;
  initialValues?: Company;
  loading?: boolean;
};
const CompanyForm: FC<Props> = ({loading, onSubmit, initialValues}) => {
  return (
    <Form
      labelCol={{span: 8}}
      initialValues={initialValues}
      wrapperCol={{span: 12}}
      onFinish={onSubmit}>
      <Form.Item name="companyName" label="Tên công ty">
        <Input />
      </Form.Item>
      <Form.Item label="Công ty mẹ" name="companyManagerID">
        <CompaniesDropDown />
      </Form.Item>
      <Form.Item name="createBy" label="Người tạo">
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
        }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Thực hiện
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CompanyForm;
