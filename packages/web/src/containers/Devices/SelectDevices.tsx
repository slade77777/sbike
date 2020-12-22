import React, {FC} from 'react';
import {Select} from 'antd';
import {Device} from 'shared-logic';
import {useGlobalState} from '../../context/devices-context';

const {Option} = Select;

const SelectDevices: FC = (props) => {
  const {devices} = useGlobalState();
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
