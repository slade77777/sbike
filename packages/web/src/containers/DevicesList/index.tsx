import React from 'react';
import {Card} from 'antd';
import DevicesTable from './DevicesTable';

const DevicesList = () => {
  return (
    <Card title="Danh sách xe">
      <DevicesTable />
    </Card>
  );
};

export default DevicesList;
