import {useMutation} from 'react-query';
import {message} from 'antd';
import {Device, updateDeviceInfo} from 'shared-logic';

export default (device: Device, onSuccessCallback?: () => void) => {
  const {mutate, isLoading} = useMutation(updateDeviceInfo, {
    onSuccess: () => {
      message.success('Thiết lập thành công!');
      onSuccessCallback?.();
    },
    onError: () => {
      message.error('Có lỗi xảy ra!');
    },
  });

  async function handleSubmit(editedDevice: Device) {
    if (device?.alertConfig) {
      await mutate(editedDevice);
    }
  }
  return {onSubmit: handleSubmit, isLoading};
};
