import React, {FC, useState} from 'react';
import {Button, Dropdown} from 'antd';
import {Device, format} from 'shared-logic';
import {MenuOutlined} from '@ant-design/icons';
import Drawer from '../../components/Drawer';
import DevicesTable from '../Devices/DevicesTable';
import TrackingDeviceMenus from './TrackingDeviceMenu';

type Props = {
  onSelectDevice?: (device: Device) => void;
  showModal?: (deviceID: string) => void;
};

const DevicesList: FC<Props> = ({onSelectDevice, showModal}) => {
  const [open, setOpen] = useState(true);
  return (
    <Drawer label="Danh sách xe" toggle={() => setOpen(!open)} open={open}>
      <DevicesTable
        size="small"
        columns={[
          {
            title: 'Biển số',
            align: 'center',
            dataIndex: 'carNumber',
            key: 'carNumber',
            render: (text: string, record: any) => (
              <Button type="link" onClick={() => onSelectDevice?.(record)}>
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
            align: 'center',
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
            align: 'center',
            dataIndex: 'deviceTime',
            key: 'deviceTime',
            render: (_: string, record: any) =>
              record.position?.deviceTime.includes('0001-01-01')
                ? ''
                : format(record.position?.deviceTime, 'HH:mm'),
          },
          {
            title: '',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_: string, record: any) => (
              <Dropdown
                overlay={
                  <TrackingDeviceMenus device={record} showModal={showModal} />
                }>
                <Button type="link" icon={<MenuOutlined />} />
              </Dropdown>
            ),
          },
        ]}
      />
    </Drawer>
  );
};

export default DevicesList;
