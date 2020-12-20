import React, {FC} from 'react';
import {Select} from 'antd';
import {Device} from 'shared-logic';

const {Option} = Select;

const SelectDevices: FC<{
  devices: Array<Device>;
}> = ({devices, ...props}) => {
  return (
    <Select {...props} showSearch placeholder="Chọn xe">
      {devices?.map((dv: Device, index: number) => (
        <Option value={dv?.deviceID || ''} key={index}>
          {dv.carNumber}
        </Option>
      ))}
    </Select>
  );
};

export default SelectDevices;
