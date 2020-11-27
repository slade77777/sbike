import React, {FC} from 'react';
import {Card} from 'antd';
import {useMutation} from 'react-query';
import {useParams} from 'react-router-dom';
import {getHistory, useDeviceId} from 'shared-logic';
import DeviceSearchForm from './DeviceSearchForm';
import Map from './Map';

const DeviceDetail: FC = () => {
  let {deviceID} = useParams();
  const {data, isLoading, isError, error} = useDeviceId(deviceID);

  const [mutate] = useMutation(getHistory);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    // @ts-ignore
    return <span>Error: {error?.message}</span>;
  }

  const handleSubmit = async ({fromTo}: any) => {
    try {
      const dataRes = await mutate({deviceID, from: fromTo[0], to: fromTo[1]});
      console.log(dataRes);
    } catch {
      // Uh oh, something went wrong
    }
  };

  return (
    <div>
      <Card
        title={<span>{`Biển số: ${data?.data?.carNumber}`}</span>}
        extra={<a>More</a>}>
        <DeviceSearchForm onSubmit={handleSubmit} />
        <Map />
      </Card>
    </div>
  );
};

export default DeviceDetail;
