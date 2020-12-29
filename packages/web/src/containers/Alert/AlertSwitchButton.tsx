import React, {FC} from 'react';
import {Button, Switch} from 'antd';
import styled from 'styled-components';
import {ButtonType} from 'antd/lib/button/button';
import {Device} from 'shared-logic';
import useAlertMutation from './useAlertMutation';

type Props = {
  device: Device;
  buttonType?: ButtonType;
  alertType: 'alertMoving' | 'alertEngine';
  label: string;
};

const AlertSwitchButton: FC<Props> = ({
  alertType,
  label,
  device,
  buttonType = 'text',
}) => {
  const {onSubmit, isLoading} = useAlertMutation(device);

  async function onChange(checked: boolean) {
    await onSubmit({
      ...device,
      alertConfig: {
        ...device.alertConfig,
        [alertType]: checked,
      },
    });
  }
  return (
    <StyledWrapper>
      <Button loading={isLoading} type={buttonType}>
        {label}
      </Button>
      <Switch
        onChange={onChange}
        defaultChecked={device?.alertConfig?.[alertType]}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default AlertSwitchButton;
