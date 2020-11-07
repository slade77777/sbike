import React, {FC} from 'react';
import {getRoleNameByValue, User} from 'shared-logic';
import {Table, Button, Space, Tag} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

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
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
  },
  {
    title: 'Quyền',
    dataIndex: 'permission',
    key: 'permission',
    render: (values: Array<string>) => {
      const mappedValue = values.map((vl) => getRoleNameByValue(vl));
      return (
        <div>
          {mappedValue.map((r, index: number) => (
            <Tag color="geekblue" key={index}>
              {r}
            </Tag>
          ))}
        </div>
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
      <Tag color={value ? 'green' : 'lightGrey'}>
        {value ? 'Đang hoạt động' : 'Chưa kích hoạt'}
      </Tag>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'update',
    key: 'x',
    render: () => (
      <Space size={8}>
        <Button type="link" icon={<EditOutlined />}>
          Sửa
        </Button>
        <Button type="link" danger icon={<DeleteOutlined />}>
          Xóa
        </Button>
      </Space>
    ),
  },
];

const AccountsList: FC<Props> = ({accounts}) => {
  return <Table dataSource={accounts} columns={columns} />;
};

export default AccountsList;
