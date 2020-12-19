import React, {FC, useMemo} from 'react';
import {Button} from 'antd';
import {useParams} from 'react-router-dom';
import {useDeviceId} from 'shared-logic';
import useAlertMutation from '../useAlertMutation';
import {useModalContext} from '../../../context/modal-context';
import AlertSpeedForm from './AlertSpeedForm';

type Props = {
  deviceID?: string;
};

const AlertSpeed: FC<Props> = ({deviceID}) => {
  const {dispatch} = useModalContext();
  const params = useParams<{deviceID: string}>();
  const deviceRes = useDeviceId(params?.deviceID || deviceID || '');
  const device = useMemo(() => deviceRes?.data?.data, [deviceRes]);

  const {onSubmit, isLoading} = useAlertMutation(device || {}, () => {
    dispatch?.({type: 'close'});
  });

  async function handleSubmit(values: {limitedSpeed: number}) {
    await onSubmit({
      alertSpeed: values.limitedSpeed,
    });
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
