import React, {FC, useMemo} from 'react';
import {Button, Space, Spin, Table} from 'antd';
import {DeviceLocation, format, ReportType} from 'shared-logic';
import {EnvironmentOutlined} from '@ant-design/icons';

type Props = {
  viewLocation?: (location: DeviceLocation) => void;
  loading: boolean;
  data: Array<any>;
  type: string | ReportType;
};

const speedColumns = [
  {
    title: 'Vận tốc giới hạn',
    dataIndex: 'message',
    key: 'message',
    render: (text: string) => text || 'N/A',
  },
  {
    title: 'Vận tốc thực tế',
    dataIndex: 'message',
    key: 'message',
    render: (_: string, record: any) => record?.position?.speed || 'N/A',
  },
];

const timeColumn = {
  title: 'Thời gian',
  dataIndex: 'time',
  key: 'time',
  render: (_: string, record: any) => (
    <Space direction="vertical" align="center" size={0}>
      <span>{format(record?.time, 'HH:ss:mm')}</span>
      <span>{format(record?.time, 'DD/MM/YYYY')}</span>
    </Space>
  ),
};

const engineColumn = {
  title: 'Trạng thái máy',
  dataIndex: 'message',
  key: 'message',
  render: (text: string) => text || 'N/A',
};

const safeZoneMessageColumn = {
  title: 'Trạng thái',
  dataIndex: 'message',
  key: 'message',
  render: (text: string) => text || 'N/A',
};

const ReportTable: FC<Props> = ({type, data, loading, viewLocation}) => {
  const positionColumn = useMemo(
    () => ({
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
      width: 60,
      render: (_: string, record: any) => (
        <Button
          type="link"
          shape="circle"
          icon={<EnvironmentOutlined />}
          onClick={() => viewLocation?.(record?.position)}
        />
      ),
    }),
    [viewLocation],
  );

  const columns = useMemo(() => {
    switch (type) {
      case '0':
        return [timeColumn, positionColumn];

      case '1':
        return [timeColumn, ...speedColumns, positionColumn];

      case '2':
        return [timeColumn, engineColumn, positionColumn];

      case '3':
        return [timeColumn, safeZoneMessageColumn, positionColumn];

      default:
        return [timeColumn, positionColumn];
    }
  }, [type, positionColumn]);

  return (
    <Spin spinning={loading}>
      <Table
        size="small"
        dataSource={data}
        columns={columns}
        scroll={{x: 300, y: 500}}
      />
    </Spin>
  );
};

export default ReportTable;
