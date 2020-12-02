import React, {FC} from 'react';
import {getRoleNameByValue, User, useUsersByCompany} from 'shared-logic';
import {Table, Button, Space, Tag, Switch, Spin} from 'antd';
import {CheckOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

type Props = {
  editUser?: (user: User) => void;
  deleteUser?: (userId: string) => void;
};

const AccountsList: FC<Props> = ({editUser}) => {
  const {data, isLoading} = useUsersByCompany();
  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string) => text || 'Unknown',
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
        const mappedValue = values?.map((vl) => getRoleNameByValue(vl));
        return (
          <Space direction={'vertical'} size="small">
            {mappedValue?.map((r, index: number) => (
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
      render: (_: any, row: User) => (
        <Space size={8}>
          <Button
            onClick={() => editUser!(row)}
            shape="circle"
            type="primary"
            icon={<EditOutlined />}
          />
          <Button shape="circle" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];
  return (
    <Spin spinning={isLoading}>
      <Table dataSource={data?.data} columns={columns} />
    </Spin>
  );
};

export default AccountsList;
