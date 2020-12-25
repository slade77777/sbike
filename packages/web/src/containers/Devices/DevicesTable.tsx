import React, {FC} from 'react';
import {Table, Space, Button, Spin} from 'antd';
import {EnvironmentOutlined} from '@ant-design/icons';
import {SizeType} from 'antd/es/config-provider/SizeContext';
import {Link, useRouteMatch} from 'react-router-dom';
import {Device, format} from 'shared-logic';
import {useAuthState} from '../../context/auth-context';
import UpdateDevice from './UpdateDevice';

type Props = {
  devices?: Device[];
  columns?: Array<any> | null;
  size?: SizeType;
};

const DevicesTable: FC<Props> = ({columns, ...props}) => {
  const routeMatch = useRouteMatch();
  const {devices, loadingDevices} = useAuthState();
  const initialColumns = columns || [
    {
      title: 'Mã thiết bị',
      align: 'center',
      dataIndex: 'deviceID',
      key: 'deviceID',
    },
    {
      title: 'Biển số xe',
      align: 'center',
      dataIndex: 'carNumber',
      key: 'carNumber',
    },
    {
      title: 'Loại thiết bị',
      align: 'center',
      dataIndex: 'deviceType',
      key: 'deviceType',
    },
    {
      title: 'Ngày hết hạn',
      align: 'center',
      dataIndex: 'expriedDate',
      key: 'expriedDate',
      render: (_: string, record: any) =>
        format(record.expriedDate, 'DD/MM/YYYY'),
    },
    {
      title: 'Cập nhật lúc',
      align: 'center',
      dataIndex: 'serverTime',
      key: 'serverTime',
      render: (_: string, record: any) =>
        record.position?.serverTime?.includes('0001-01-01')
          ? ''
          : format(record.position?.serverTime, 'HH:mm:ss DD/MM/YYYY'),
    },
    {
      title: 'Hành động',
      align: 'center',
      key: 'action',
      render: (_: string, record: any) => (
        <Space size="middle">
          <UpdateDevice device={record} type="icon" />
          <Button type="link" icon={<EnvironmentOutlined />}>
            <Link to={`${routeMatch.path}/${record.deviceID}`}>
              {' '}
              Xem lại lộ trình
            </Link>
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Spin spinning={loadingDevices}>
      <Table
        {...props}
        rowKey="deviceID"
        columns={initialColumns}
        dataSource={
          devices?.map((device) => ({
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
