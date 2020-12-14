import React, {FC, useState} from 'react';
import {Button, Popover} from 'antd';
import {format, LatLng} from 'shared-logic';
import {DownOutlined, MenuOutlined} from '@ant-design/icons';
import DevicesTable from './DevicesTable';

const DevicesDropDown: FC<{
  onSelectDevice: (pos: LatLng) => void;
}> = ({onSelectDevice}) => {
  const [visible, setVisible] = useState(true);

  return (
    <Popover
      placement="bottom"
      title="Danh sách xe"
      content={
        <DevicesTable
          size="small"
          columns={[
            {
              title: 'Biển số',
              dataIndex: 'carNumber',
              key: 'carNumber',
              render: (text: string, record: any) => (
                <Button
                  type="link"
                  onClick={() =>
                    onSelectDevice({
                      lat: record?.position?.latitude,
                      lng: record?.position?.longitude,
                    })
                  }>
                  {text}
                </Button>
              ),
            },
            {
              title: (
                <span>
                  Vận tốc <br /> (km/h)
                </span>
              ),
              dataIndex: 'speed',
              key: 'speed',
              render: (_: string, record: any) => record.position?.speed,
            },
            {
              title: (
                <span>
                  Thời gian <br /> (HH:mm)
                </span>
              ),
              dataIndex: 'deviceTime',
              key: 'deviceTime',
              render: (_: string, record: any) =>
                format(record.position?.deviceTime, 'HH:mm'),
            },
            {
              title: '',
              dataIndex: 'action',
              key: 'action',
              render: () => <MenuOutlined />,
            },
          ]}
        />
      }
      trigger="click">
      <Button onClick={() => setVisible(!visible)} type="primary">
        Danh sách xe <DownOutlined />
      </Button>
    </Popover>
  );
};

export default DevicesDropDown;
