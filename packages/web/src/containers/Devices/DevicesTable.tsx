import React, {FC} from 'react';
import {Table, Space, Button, Spin} from 'antd';
import {EditOutlined, EyeOutlined} from '@ant-design/icons';
import {SizeType} from 'antd/es/config-provider/SizeContext';
import {Link, useRouteMatch} from 'react-router-dom';
import {Device, getDeviceByCompany, useUserInfo, format} from 'shared-logic';
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
        record.expriedDate?.includes('0001-01-01') ? '' : format(record.expiredDate, 'DD/MM/YYYY'),
    },
    {
      title: 'Cập nhật lúc',
      align: 'center',
      dataIndex: 'serverTime',
      key: 'serverTime',
      render: (_: string, record: any) =>
        record.position?.serverTime?.includes('0001-01-01') ? '' : format(record.position?.serverTime, 'HH:mm:ss DD/MM/YYYY'),
    },
    {
      title: 'Hành động',
      align: 'center',
      key: 'action',
      render: (_: string, record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />}>
            Sửa
          </Button>
          <Button type="link" icon={<EyeOutlined />}>
            <Link to={`${routeMatch.path}/${record.deviceID}`}> Chi tiết</Link>
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
