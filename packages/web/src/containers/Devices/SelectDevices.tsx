import React, {FC} from 'react';
import {Select} from 'antd';
import {Device, useDeviceByCompany, useUserInfo} from 'shared-logic';

const {Option} = Select;

const SelectDevices: FC = (props) => {
  const userRes = useUserInfo();
  const {data, isLoading} = useDeviceByCompany(userRes.data?.data?.companyID);

  function onSearch() {}

  return (
    <Select
      {...props}
      loading={isLoading}
      showSearch
      placeholder="Chọn xe"
      onSearch={onSearch}>
      {data?.data?.map((dv: Device, index: number) => (
        <Option value={dv?.deviceID || ''} key={index}>
          {dv.carNumber}
        </Option>
      ))}
    </Select>
  );
};

export default SelectDevices;
