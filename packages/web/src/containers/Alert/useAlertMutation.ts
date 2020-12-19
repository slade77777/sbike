import {useMutation} from 'react-query';
import {message} from 'antd';
import {AlertConfig, Device, updateDeviceInfo} from 'shared-logic';

export default (device: Device, onSuccessCallback?: () => void) => {
  const [mutate, {isLoading}] = useMutation(updateDeviceInfo, {
    onSuccess: () => {
      message.success('Thiết lập thành công!');
      onSuccessCallback?.();
    },
    onError: () => {
      message.error('Có lỗi xảy ra!');
    },
  });

  async function handleSubmit(alertConfig: AlertConfig) {
    if (device?.alertConfig) {
      await mutate({
        ...device,
        alertConfig: {
          ...device.alertConfig,
          ...alertConfig,
        },
      });
    }
  }
  return {onSubmit: handleSubmit, isLoading};
};
