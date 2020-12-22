import React, {FC} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Button, Menu} from 'antd';
import styled from 'styled-components';
import {Device} from 'shared-logic';
import {RoutesEnum} from '../../enum';
import UpdateDevice from '../Devices/UpdateDevice';
import SettingEngineOnOff from '../SettingEngineOneOff';
import AlertSwitchButton from '../Alert/AlertSwitchButton';
import AlertSpeed from '../Alert/AlertSpeed';

type DropdownMenuProps = {
  device: Device;
  alertMoving?: (vl: any) => void;
  alertTurnOnOff?: (vl: any) => void;
  showModal?: (deviceID: string) => void;
};
const TrackingDeviceMenus: FC<DropdownMenuProps> = ({device}) => {
  const history = useHistory();

  return (
    <Menu>
      <Menu.Item>
        <Link to={RoutesEnum.Devices + '/' + device?.deviceID}>
          <Button type="text">Xem lại lộ trình</Button>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <UpdateDevice type="text" device={device} />
      </Menu.Item>
      <Menu.Item>
        <SettingEngineOnOff device={device} />
      </Menu.Item>
      <Menu.SubMenu title="Cảnh báo" style={{paddingLeft: 15}}>
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
export default TrackingDeviceMenus;
