import React, {FC} from 'react';
import {Button} from 'antd';
import {useModalContext} from '../../../context/modal-context';
import AlertSpeedForm from './AlertSpeedForm';

type Props = {
  deviceID?: string;
  carNumber?: string;
};

const AlertSpeed: FC<Props> = ({carNumber}) => {
  const {dispatch} = useModalContext();
  function showModal() {
    dispatch?.({
      type: 'open',
      payload: {
        title: `Cảnh báo quá tốc độ (Biển số: ${carNumber})`,
        modalComponent: <AlertSpeedForm />,
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
