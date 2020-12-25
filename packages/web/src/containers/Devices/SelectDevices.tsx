import React, {FC} from 'react';
import {Select} from 'antd';
import {Device} from 'shared-logic';
import {useAuthState} from '../../context/auth-context';

const {Option} = Select;

const SelectDevices: FC = (props) => {
  const {devices} = useAuthState();
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
