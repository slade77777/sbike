import React, {FC} from 'react';
import {Button, Spin, Table} from 'antd';
import {format, LatLng} from 'shared-logic';
import {EnvironmentOutlined} from '@ant-design/icons';

type Props = {
  viewLocation?: (location: LatLng) => void;
  loading: boolean;
  data: Array<any>;
};
const ReportTable: FC<Props> = ({data, loading, viewLocation}) => {
  const defaultColumns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      render: (_: string, record: any) =>
        format(record?.time, 'HH:ss:mm-DD/MM/YYYY'),
    },
    {
      title: 'Trạng thái máy',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
      render: (_: string, record: any) => (
        <Button
          type="text"
          icon={<EnvironmentOutlined />}
          onClick={() =>
            viewLocation?.({
              lat: record?.position?.latitude,
              lng: record?.position?.longitude,
            })
          }
        />
      ),
    },
  ];
  return (
    <Spin spinning={loading}>
      <Table dataSource={data || []} columns={defaultColumns} />
    </Spin>
  );
};

export default ReportTable;
