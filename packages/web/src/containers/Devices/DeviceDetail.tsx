import React, {FC} from 'react';
import {useMutation} from 'react-query';
import {useParams} from 'react-router-dom';
import {Card, message} from 'antd';
import {getHistory, useDeviceId} from 'shared-logic';
import DeviceSearchForm from './DeviceSearchForm';
import DetailWrapper from './DetailWrapper';
import DeviceInfo from './DeviceInfo';

const DeviceDetail: FC = () => {
  let {deviceID} = useParams();
  const [mutate, historyMovingData] = useMutation(getHistory);
  const deviceRes = useDeviceId(deviceID);

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
          <Card
            title={
              <DeviceInfo
                carNumber={deviceRes?.data?.data?.carNumber || ''}
                isLoading={deviceRes?.isLoading}
              />
            }
            size="small">
            <DeviceSearchForm onSubmit={handleSubmit} />
          </Card>
        }
        locations={historyMovingData?.data?.data}
        deviceInfo={{
          carNumber: deviceRes?.data?.data?.carNumber || '',
          expriedDate: deviceRes?.data?.data?.expriedDate || '',
        }}
      />
    </>
  );
};

export default DeviceDetail;
