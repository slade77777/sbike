import React, {FC, useMemo} from 'react';
import {useMutation} from 'react-query';
import {useParams} from 'react-router-dom';
import {Card, message} from 'antd';
import {getHistory} from 'shared-logic';
import DeviceSearchForm from './DeviceSearchForm';
import DetailWrapper from './DetailWrapper';
import DeviceInfo from './DeviceInfo';

const DeviceDetail: FC = () => {
  let {deviceID} = useParams();
  const [mutate, historyMovingData] = useMutation(getHistory);

  const paths = useMemo(
    () =>
      historyMovingData?.data?.data?.map((dt: any) => ({
        lat: dt.latitude,
        lng: dt.longitude,
        direction: dt.direction,
        time: dt.serverTime,
        speed: dt.speed,
        batteryVoltage: dt.batteryVoltage,
        status: dt.status,
      })),
    [historyMovingData],
  );

  const handleSubmit = async ({fromTo}: any) => {
    try {
      const res = await mutate({deviceID, from: fromTo[0], to: fromTo[1]});
      if (res?.data?.length === 0 || !res?.data) {
        message.warning('Không có dữ liệu');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <DetailWrapper
        info={
          <Card title={<DeviceInfo deviceID={deviceID} />} size="small">
            <DeviceSearchForm onSubmit={handleSubmit} />
          </Card>
        }
        data={paths}
      />
    </>
  );
};

export default DeviceDetail;
