import React from 'react';
import {Table, Space, Button} from 'antd';
import {EditOutlined, EyeOutlined} from '@ant-design/icons';
import {Link, useRouteMatch} from 'react-router-dom';

const data = [
  {
    key: '1',
    deviceID: '022202700999',
    cardNumber: '30F88888',
    deviceType: 'Xe may',
    expiredDate: '30/11/2020',
    updatedDate: '30/11/2020',
  },
];

const DevicesTable = () => {
  const routeMatch = useRouteMatch();
  const columns = [
    {
      title: 'Mã thiết bị',
      dataIndex: 'deviceID',
      key: 'deviceID',
    },
    {
      title: 'Biển số xe',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
    },
    {
      title: 'Loại thiết bị',
      dataIndex: 'deviceType',
      key: 'deviceType',
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expiredDate',
      key: 'expiredDate',
    },
    {
      title: 'Cập nhật',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
    },
    {
      title: '',
      key: 'action',
      render: (_: string, record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />}>
            Sửa
          </Button>
          <Button type="link" icon={<EyeOutlined />}>
            <Link to={`${routeMatch.path}/${record.deviceID}`}>Chi tiết</Link>
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  );
};

export default DevicesTable;
