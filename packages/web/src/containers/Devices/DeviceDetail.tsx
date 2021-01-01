import React, {FC, useMemo, useState} from 'react';
import {useMutation} from 'react-query';
import {useParams} from 'react-router-dom';
import {Card, message} from 'antd';
import {getHistory, useDeviceId} from 'shared-logic';
import DeviceSearchForm from './DeviceSearchForm';
import DetailWrapper from './DetailWrapper';

const DeviceDetail: FC = () => {
  let {deviceID} = useParams();
  const [selectedDevice, setSelectedDevice] = useState<string>(deviceID);
  const historyMutation = useMutation(getHistory, {
    onSuccess: async (data) => {
      if (data?.data.length === 0 || !data?.data) {
        message.warning('Không có dữ liệu');
      }
    },
  });
  const deviceRes = useDeviceId(selectedDevice);

  const handleSubmit = async (values: {
    deviceID: string;
    fromTo: Array<string>;
  }) => {
    setSelectedDevice(values.deviceID);
    await historyMutation.mutate({
      deviceID: values.deviceID,
      from: values.fromTo[0],
      to: values.fromTo[1],
    });
  };

  const deviceInfo = useMemo(() => {
    return {
      carNumber: deviceRes?.data?.data?.carNumber || '',
      expriedDate: deviceRes?.data?.data?.expriedDate || '',
    };
  }, [deviceRes?.data?.data?.carNumber, deviceRes?.data?.data?.expriedDate]);

  return (
    <>
      <DetailWrapper
        info={
          <Card size="small">
            <DeviceSearchForm
              onSubmit={handleSubmit}
              selectedDeviceId={deviceID}
            />
          </Card>
        }
        locations={historyMutation?.data?.data}
        deviceInfo={deviceInfo}
      />
    </>
  );
};

export default DeviceDetail;
