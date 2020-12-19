import React, {FC} from 'react';
import {Button, message} from 'antd';
import styled from 'styled-components';
import {useMutation} from 'react-query';
import {Device, updateDeviceInfo} from 'shared-logic';
import {useModalContext} from '../../context/modal-context';
import ToggleButton from './ToggleButton';

const SettingEngineOnOff: FC<{device: Device}> = ({device}) => {
  const {dispatch} = useModalContext();
  const [mutate, {isLoading}] = useMutation(updateDeviceInfo, {
    onSuccess: () => {
      message.success('Cập nhật thành công!');
      dispatch?.({type: 'close'});
    },
    onError: () => {
      message.error('Có lỗi xảy ra!');
    },
  });

  async function handleUpdate(status: 'on' | 'off') {
    if (device) {
      await mutate({
        ...device,
        isSettingEngineOn: status === 'on',
      });
    }
  }

  function showModal() {
    dispatch?.({
      type: 'open',
      payload: {
        title: 'Điều khiển tắt/bật máy',
        modalComponent: (
          <StyledOnOff>
            <ToggleButton
              status="on"
              onClick={() => handleUpdate('off')}
              isLoading={isLoading}
            />
            <ToggleButton
              status="off"
              isLoading={isLoading}
              onClick={() => handleUpdate('on')}
            />
          </StyledOnOff>
        ),
      },
    });
  }
  return (
    <Button type="text" onClick={showModal}>
      Điều khiển tắt/bật máy
    </Button>
  );
};

const StyledOnOff = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(60px, 80px));
  grid-gap: 50px;
  justify-content: center;
`;

export default SettingEngineOnOff;
