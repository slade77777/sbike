import React, {FC} from 'react';
import {Button, Card, Space, Menu, Dropdown} from 'antd';
import {EditOutlined, DownOutlined, AlertOutlined} from '@ant-design/icons';
import {useMutation} from 'react-query';
import {useParams} from 'react-router-dom';
import {getHistory, useDeviceId} from 'shared-logic';
import DeviceSearchForm from './DeviceSearchForm';
import DeviceMap from './DeviceMap';

const menu = (
  <Menu>
    <Menu.Item key="1" icon={<AlertOutlined />}>
      Cảnh báo di chuyển
    </Menu.Item>
    <Menu.Item key="2" icon={<AlertOutlined />}>
      Cảnh báo tắt bật máy
    </Menu.Item>
    <Menu.Item key="3" icon={<AlertOutlined />}>
      Cảnh báo quá tốc độ
    </Menu.Item>
    <Menu.Item key="4" icon={<AlertOutlined />}>
      Cảnh báo vùng an toàn
    </Menu.Item>
  </Menu>
);

const DeviceDetail: FC = () => {
  let {deviceID} = useParams();
  const {data, isLoading, isError, error} = useDeviceId(deviceID);

  const [mutate, historyMovingData] = useMutation(getHistory);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    // @ts-ignore
    return <span>Error: {error?.message}</span>;
  }

  const handleSubmit = async ({fromTo}: any) => {
    try {
      await mutate({deviceID, from: fromTo[0], to: fromTo[1]});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card
      title={<span>{`Biển số: ${data?.data?.carNumber}`}</span>}
      extra={
        <Space>
          <Button type="link" icon={<EditOutlined />}>
            Cập nhật thông tin
          </Button>
          <Button type="link">Điều khiển Tắt / Bật máy</Button>
          <Dropdown overlay={menu}>
            <a>
              Cảnh báo <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      }>
      <DeviceSearchForm onSubmit={handleSubmit} />
      <DeviceMap
        velocity={100}
        initialDate={Date.now()}
        paths={historyMovingData?.data?.data.map((dt: any) => ({
          lat: dt.latitude,
          lng: dt.longitude,
        }))}
      />
    </Card>
  );
};

export default DeviceDetail;
