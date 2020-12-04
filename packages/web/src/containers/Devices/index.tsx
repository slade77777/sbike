import React from 'react';
import {useQuery} from 'react-query';
import {Card, Spin} from 'antd';
import {getDeviceByCompany, useUserInfo} from 'shared-logic';
import DevicesTable from './DevicesTable';

const Devices = () => {
  const userRes = useUserInfo();
  const {data, isLoading} = useQuery(
    [
      'companyDevice',
      userRes.data?.data?.companyID && userRes.data.data.companyID,
    ],
    getDeviceByCompany,
    {
      retry: true,
    },
  );
  return (
    <Spin spinning={isLoading}>
      <Card title="Danh sách xe">
        <DevicesTable devices={data?.data || []} />
      </Card>
    </Spin>
  );
};

export default Devices;
