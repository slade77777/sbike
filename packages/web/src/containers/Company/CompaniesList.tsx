import React, {FC} from 'react';
import {Table, Spin} from 'antd';
import {Company, format} from 'shared-logic';
import UpdateCompanyButton from './UpdateCompanyButton';

type Props = {
  companies: Company[];
  isLoading?: boolean;
};
const CompaniesList: FC<Props> = ({companies, isLoading}) => {
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
        <UpdateCompanyButton currentCompany={record} />
      ),
    },
  ];
  return (
    <Spin spinning={isLoading}>
      <Table rowKey="companyID" columns={columns} dataSource={companies} />
    </Spin>
  );
};

export default CompaniesList;
