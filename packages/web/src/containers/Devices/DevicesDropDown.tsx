import React, {FC, useState} from 'react';
import {Button, Card} from 'antd';
import {format} from 'shared-logic';
import {DownOutlined, MenuOutlined} from '@ant-design/icons';
import DevicesTable from './DevicesTable';

const DevicesDropDown: FC<{
  onSelectDevice: (pos: {latitude: number; latitude: number}) => void;
}> = ({onSelectDevice}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
      }}>
      <Button onClick={() => setVisible(!visible)}>
        Danh sách xe <DownOutlined />
      </Button>
      {visible && (
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 0,
            zIndex: 99,
            width: 500,
            height: '100%',
          }}>
          <Card>
            <DevicesTable
              columns={[
                {
                  title: 'Biển số',
                  dataIndex: 'carNumber',
                  key: 'carNumber',
                  render: (text, record) => (
                    <Button
                      type="link"
                      onClick={() =>
                        onSelectDevice({
                          latitude: record?.position?.latitude,
                          longitude: record?.position?.longitude,
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
                  render: (_, record) => record.position?.speed,
                },
                {
                  title: (
                    <span>
                      Thời gian <br /> (HH:mm)
                    </span>
                  ),
                  dataIndex: 'deviceTime',
                  key: 'deviceTime',
                  render: (_, record) =>
                    format(record.position?.deviceTime, 'HH:mm'),
                },
                {
                  title: '',
                  dataIndex: 'action',
                  key: 'action',
                  render: (_, record) => <MenuOutlined />,
                },
              ]}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default DevicesDropDown;
