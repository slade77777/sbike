import React, {FC, useMemo} from 'react';
import {Button, message} from 'antd';
import {useMutation} from 'react-query';
import {useParams} from 'react-router-dom';
import {updateDeviceInfo, useDeviceId} from 'shared-logic';
import {useModalContext} from '../../../context/modal-context';
import AlertSpeedForm from './AlertSpeedForm';

type Props = {
  deviceID?: string;
};

const AlertSpeed: FC<Props> = ({deviceID}) => {
  const {dispatch} = useModalContext();
  const params = useParams<{deviceID: string}>();
  const deviceRes = useDeviceId(params?.deviceID || deviceID || '');
  const [mutate, {isLoading}] = useMutation(updateDeviceInfo, {
    onSuccess: () => {
      message.success('Thiết lập thành công!');
      dispatch?.({type: 'close'});
    },
    onError: () => {
      message.error('Có lỗi xảy ra!');
    },
  });

  const device = useMemo(() => deviceRes?.data?.data, [deviceRes]);

  async function handleSubmit(values: {limitedSpeed: number}) {
    if (device) {
      await mutate({
        ...device,
        alertConfig: {
          ...device?.alertConfig,
          alertSpeed: values.limitedSpeed,
        },
      });
    }
  }

  function showModal() {
    dispatch?.({
      type: 'open',
      payload: {
        title: `Cảnh báo quá tốc độ (Biển số: ${device?.carNumber})`,
        modalComponent: (
          <AlertSpeedForm onSubmit={handleSubmit} isLoading={isLoading} />
        ),
      },
    });
  }
  return (
    <Button type="link" onClick={showModal}>
      Cảnh báo quá tốc độ
    </Button>
  );
};

export default AlertSpeed;
