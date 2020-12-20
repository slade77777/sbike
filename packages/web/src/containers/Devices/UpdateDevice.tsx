import React, {FC} from 'react';
import {EditOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {Device} from 'shared-logic';
import dayjs from 'dayjs';
import {useModalContext} from '../../context/modal-context';
import useAlertMutation from '../Alert/useAlertMutation';
import UpdateDeviceForm from './UpdateDeviceForm';

type Props = {
  type: 'icon' | 'text';
  device: Device;
};

function formatValues(device: Device) {
  return {
    ...device,
    expriedDate: dayjs(device.expriedDate).isValid()
      ? dayjs(device.expriedDate)
      : dayjs(new Date()),
  };
}

const UpdateDevice: FC<Props> = ({type, device}) => {
  const {dispatch} = useModalContext();
  const {onSubmit, isLoading} = useAlertMutation(device, () => {
    dispatch?.({type: 'close'});
  });

  async function submitForm(value: any) {
    await onSubmit({
      ...device,
      ...value,
    });
  }

  function showModal() {
    dispatch?.({
      type: 'open',
      payload: {
        title: `Cập nhật thông tin xe`,
        modalComponent: (
          <UpdateDeviceForm
            onSubmit={submitForm}
            initialValues={formatValues(device)}
          />
        ),
      },
    });
  }
  if (type === 'icon') {
    return (
      <Button
        loading={isLoading}
        type="link"
        icon={<EditOutlined />}
        onClick={showModal}>
        Sửa
      </Button>
    );
  }
  return (
    <div>
      <Button onClick={showModal} type="text" loading={isLoading}>
        Cập nhật thông tin
      </Button>
    </div>
  );
};

export default UpdateDevice;
