import React, {FC, useState} from 'react';
import {Button, Menu, Popover, Dropdown, Switch} from 'antd';
import {Device, format} from 'shared-logic';
import {Link} from 'react-router-dom';
import {DownOutlined, MenuOutlined} from '@ant-design/icons';
import {RoutesEnum} from '../../enum';
import DevicesTable from './DevicesTable';

type DropdownMenuProps = {
  deviceID: string;
  alertMoving?: (vl: any) => void;
  alertTurnOnOff?: (vl: any) => void;
  showModal?: (deviceID: string) => void;
};
const DropdownMenu: FC<DropdownMenuProps> = ({
  deviceID,
  alertMoving,
  alertTurnOnOff,
  showModal,
}) => (
  <Menu>
    <Menu.Item>
      <Link to={RoutesEnum.Devices + '/' + deviceID}>Xem lại lộ trình</Link>
    </Menu.Item>
    <Menu.Item>Cập nhật thông tin</Menu.Item>
    <Menu.Item>Điều khiển Tắt / Bật máy</Menu.Item>
    <Menu.SubMenu title="Cảnh báo">
      <div style={{padding: 15}}>
        Cảnh báo di chuyển <Switch onClick={alertMoving} />
      </div>
      <div style={{padding: 15}}>
        Cảnh báo tắt / bật máy <Switch onClick={alertTurnOnOff} />
      </div>
      <Menu.Item onClick={() => showModal?.(deviceID)}>
        Cảnh báo quá tốc độ
      </Menu.Item>
      <Menu.Item>
        <Link to={`/giam-sat/${deviceID}/canh-bao-vung-an-toan`}>
          Cảnh báo vùng an toàn
        </Link>
      </Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

const DevicesDropDown: FC<{
  onSelectDevice?: (device: Device) => void;
  showModal?: (deviceID: string) => void;
}> = ({onSelectDevice, showModal}) => {
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
                    <DropdownMenu
                      deviceID={record?.deviceID}
                      showModal={showModal}
                    />
                  }>
                  <Button type="link" icon={<MenuOutlined />} />
                </Dropdown>
              ),
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
