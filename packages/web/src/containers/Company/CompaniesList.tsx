import React, {FC} from 'react';
import {Table, Space, Button, Spin} from 'antd';
import {EditOutlined, EyeOutlined} from '@ant-design/icons';
import {Company, format} from 'shared-logic';

type Props = {
  companies: Company[];
  isLoading?: boolean;
  selectCompany?: (vl: Company) => void;
};
const CompaniesList: FC<Props> = ({companies, isLoading, selectCompany}) => {
  const columns = [
    {
      title: 'Mã công ty',
      dataIndex: 'companyID',
      key: 'companyID',
    },
    {
      title: 'Công ty',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Mã công ty quản lý',
      dataIndex: 'companyManagerID',
      key: 'companyManagerID',
    },
    {
      title: 'Tạo bởi',
      dataIndex: 'createBy',
      key: 'createBy',
    },
    {
      title: 'Cập nhật',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text: string) => format(text),
    },
    {
      title: '',
      key: 'action',
      render: (_: string, record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />}>
            Sửa
          </Button>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => selectCompany?.(record)}>
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Spin spinning={isLoading}>
      <Table columns={columns} dataSource={companies} />
    </Spin>
  );
};

export default CompaniesList;
