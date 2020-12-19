import React, {FC, useState} from 'react';
import styled from 'styled-components';
import {Button, Menu, Popover, Dropdown} from 'antd';
import {Device, format} from 'shared-logic';
import {Link, useHistory} from 'react-router-dom';
import {DownOutlined, MenuOutlined} from '@ant-design/icons';
import {RoutesEnum} from '../../enum';
import AlertSpeed from '../Alert/AlertSpeed';
import AlertSwitchButton from '../Alert/AlertSwitchButton';
import SettingEngineOnOff from '../SettingEngineOneOff';
import DevicesTable from './DevicesTable';

type DropdownMenuProps = {
  device: Device;
  alertMoving?: (vl: any) => void;
  alertTurnOnOff?: (vl: any) => void;
  showModal?: (deviceID: string) => void;
};
const DropdownMenu: FC<DropdownMenuProps> = ({device}) => {
  const history = useHistory();

  return (
    <Menu>
      <Menu.Item>
        <Link to={RoutesEnum.Devices + '/' + device?.deviceID}>
          Xem lại lộ trình
        </Link>
      </Menu.Item>
      <Menu.Item>Cập nhật thông tin</Menu.Item>
      <Menu.Item>
        <SettingEngineOnOff device={device} />
      </Menu.Item>
      <Menu.SubMenu title="Cảnh báo">
        <div style={{width: 250}}>
          <StyledMenu>
            <AlertSwitchButton
              key="alertMoving"
              device={device}
              alertType="alertMoving"
              label="Cảnh báo di chuyển"
            />
          </StyledMenu>
          <StyledMenu>
            <AlertSwitchButton
              key="alertEngine"
              device={device}
              alertType="alertEngine"
              label="Cảnh báo tắt / bật máy"
            />
          </StyledMenu>
          <StyledMenu>
            <AlertSpeed deviceID={device?.deviceID} />
          </StyledMenu>
          <StyledMenu>
            <Button
              type="link"
              onClick={() =>
                history.push(`/giam-sat/${device?.deviceID}/canh-bao`)
              }>
              Cảnh báo vùng an toàn
            </Button>
          </StyledMenu>
        </div>
      </Menu.SubMenu>
    </Menu>
  );
};

const StyledMenu = styled.div`
  padding: 10px;
  border-bottom: 1px solid aliceblue;
`;

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
                    <DropdownMenu device={record} showModal={showModal} />
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
