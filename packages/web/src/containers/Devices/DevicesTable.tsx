import React, {FC} from 'react';
import {Table, Space, Button, Spin, Typography} from 'antd';
import {EnvironmentOutlined} from '@ant-design/icons';
import {SizeType} from 'antd/es/config-provider/SizeContext';
import {Link, useRouteMatch} from 'react-router-dom';
import {Device, format, getFullYear} from 'shared-logic';
import {useAuthState} from '../../context/auth-context';
import UpdateDevice from './UpdateDevice';

const {Text} = Typography;

type Props = {
  devices?: Device[];
  columns?: Array<any> | null;
  size?: SizeType;
  scroll?: {
    y: number;
  };
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
      render: (text: string) => text || '...',
    },
    {
      title: 'Ngày hết hạn',
      align: 'center',
      dataIndex: 'expriedDate',
      key: 'expriedDate',
      render: (_: string, record: any) =>
        getFullYear(record.expriedDate) > 1 ? (
          <Text type="secondary">
            {format(record.expriedDate, 'DD/MM/YYYY')}
          </Text>
        ) : (
          '...'
        ),
    },
    {
      title: 'Cập nhật lúc',
      align: 'center',
      dataIndex: 'serverTime',
      key: 'serverTime',
      render: (_: string, record: any) =>
        getFullYear(record.position?.serverTime) > 1 ? (
          <Text type="secondary">
            {format(record.position?.serverTime, 'HH:mm:ss DD/MM/YYYY')}
          </Text>
        ) : (
          '...'
        ),
    },
    {
      title: '',
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
        pagination={{
          defaultPageSize: 20,
        }}
        columns={initialColumns}
        dataSource={
          devices?.map((device) => ({
            ...device,
            carNumber: device.carNumber || 'unknown',
          })) || []
        }
        bordered={false}
      />
    </Spin>
  );
};

export default DevicesTable;
