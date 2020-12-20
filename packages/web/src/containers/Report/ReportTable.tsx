import React, {FC} from 'react';
import {Button, Spin, Table} from 'antd';
import {DeviceLocation, format, ReportType} from 'shared-logic';
import {EnvironmentOutlined} from '@ant-design/icons';

type Props = {
  viewLocation?: (location: DeviceLocation) => void;
  loading: boolean;
  data: Array<any>;
  type: string | ReportType;
};

const speedColumn = {
  title: 'Vận tốc thực tế',
  dataIndex: 'message',
  key: 'message',
  render: (_: string, record: any) => record?.position?.speed || 'N/A',
};

const ReportTable: FC<Props> = ({type, data, loading, viewLocation}) => {
  const position = {
    title: 'Vị trí',
    dataIndex: 'position',
    key: 'position',
    render: (_: string, record: any) => (
      <Button
        type="text"
        icon={<EnvironmentOutlined />}
        onClick={() => viewLocation?.(record?.position)}
      />
    ),
  };
  const defaultColumns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      render: (_: string, record: any) =>
        format(record?.time, 'HH:ss:mm-DD/MM/YYYY'),
    },
    {
      title: type == ReportType.SPEED ? 'Vận tốc giới hạn' : 'Trạng thái máy',
      dataIndex: 'message',
      key: 'message',
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table
        dataSource={data || []}
        columns={
          type == ReportType.SPEED
            ? [...defaultColumns, speedColumn, position]
            : defaultColumns
        }
      />
    </Spin>
  );
};

export default ReportTable;
