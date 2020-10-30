import React, {FC} from 'react';
import {Table, Button} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

type Props = {
  accounts: Array<string>;
};

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    dataIndex: 'update',
    key: 'x',
    render: () => (
      <div>
        <Button type="link" icon={<EditOutlined />}>
          Sửa
        </Button>
        &nbsp; &nbsp;
        <Button type="link" danger icon={<DeleteOutlined />}>
          Xóa
        </Button>
      </div>
    ),
  },
];

const AccountsList: FC<Props> = ({accounts}) => {
  return <Table dataSource={dataSource} columns={columns} />;
};

export default AccountsList;
