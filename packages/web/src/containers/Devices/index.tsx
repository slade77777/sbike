import React from 'react';
import {Card} from 'antd';
import DevicesTable from './DevicesTable';

const Devices = () => {
  return (
    <Card title="Danh sách xe" bodyStyle={{padding: 0}}>
      <DevicesTable />
    </Card>
  );
};

export default Devices;
