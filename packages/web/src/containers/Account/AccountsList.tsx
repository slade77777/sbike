import React, {FC} from 'react';
import {getRoleNameByValue, User} from 'shared-logic';
import {Table, Button, Space, Tag, Switch} from 'antd';
import {CheckOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

type Props = {
  accounts: User[];
};

const columns = [
  {
    title: 'Họ tên',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Tên đăng nhập',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'Quyền',
    dataIndex: 'permission',
    key: 'permission',
    render: (values: Array<string>) => {
      const mappedValue = values.map((vl) => getRoleNameByValue(vl));
      return (
        <Space direction={'vertical'} size="small">
          {mappedValue.map((r, index: number) => (
            <div key={index}>
              <Tag color="geekblue">{r}</Tag>
            </div>
          ))}
        </Space>
      );
    },
  },
  {
    title: 'Công ty',
    dataIndex: 'companyID',
    key: 'companyID',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'active',
    key: 'active',
    render: (value: boolean) => (
      <Switch checkedChildren={<CheckOutlined />} checked={!!value} />
    ),
  },
  {
    title: 'Sửa / Xóa',
    dataIndex: 'update',
    key: 'update',
    render: () => (
      <Space size={8}>
        <Button shape="circle" type="primary" icon={<EditOutlined />} />
        <Button shape="circle" danger icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

const AccountsList: FC<Props> = ({accounts}) => {
  return <Table dataSource={accounts} columns={columns} />;
};

export default AccountsList;
