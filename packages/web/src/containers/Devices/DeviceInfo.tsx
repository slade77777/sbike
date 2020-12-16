import React, {FC} from 'react';
import {Spin} from 'antd';

type Props = {
  carNumber: string;
  isLoading: boolean;
};
const DeviceInfo: FC<Props> = ({carNumber, isLoading}) => {
  return (
    <Spin spinning={isLoading}>
      <h3>{`Biển số: ${carNumber}`}</h3>
    </Spin>
  );
};

export default DeviceInfo;
