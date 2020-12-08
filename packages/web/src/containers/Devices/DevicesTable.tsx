import React, {FC} from 'react';
import {Table, Space, Button, Spin} from 'antd';
import {EditOutlined, EyeOutlined} from '@ant-design/icons';
import {SizeType} from 'antd/es/config-provider/SizeContext';
import {Link, useRouteMatch} from 'react-router-dom';
import {Device, getDeviceByCompany, useUserInfo} from 'shared-logic';
import {useQuery} from 'react-query';

type Props = {
  devices?: Device[];
  columns?: Array<any> | null;
  size?: SizeType;
};

const DevicesTable: FC<Props> = ({columns, ...props}) => {
  const routeMatch = useRouteMatch();
  const userRes = useUserInfo();
  const {data, isLoading} = useQuery(
    [
      'companyDevice',
      userRes.data?.data?.companyID && userRes.data.data.companyID,
    ],
    getDeviceByCompany,
  );
  const initialColumns = columns || [
    {
      title: 'Mã thiết bị',
      dataIndex: 'deviceID',
      key: 'deviceID',
    },
    {
      title: 'Biển số xe',
      dataIndex: 'carNumber',
      key: 'carNumber',
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
    <Spin spinning={isLoading}>
      <Table
        {...props}
        rowKey="deviceID"
        columns={initialColumns}
        dataSource={
          data?.data?.map((device) => ({
            ...device,
            carNumber: device.carNumber || 'unknown',
          })) || []
        }
        bordered
      />
    </Spin>
  );
};

export default DevicesTable;
