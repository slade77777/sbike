import React, {FC} from 'react';
import {useDeviceId} from 'shared-logic';
import {Spin} from 'antd';

type Props = {
  deviceID: string;
};
const DeviceInfo: FC<Props> = ({deviceID}) => {
  const {data, isLoading} = useDeviceId(deviceID);
  return (
    <Spin spinning={isLoading}>
      <h3>{`Biển số: ${data?.data?.carNumber}`}</h3>
    </Spin>
  );
};

export default DeviceInfo;
