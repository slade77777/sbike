import React, {FC} from 'react';
// import {Button, Space} from 'antd';
import {useParams} from 'react-router-dom';
import {useMutation} from 'react-query';
import {LatLng, updateDeviceInfo} from 'shared-logic';
import styled from 'styled-components';
import SafeZoneAlertMap from './SafeZoneAlertMap';

type Props = {};

const AlertZone: FC<Props> = () => {
  const params = useParams<{deviceID: string}>();
  const [mutate, {isLoading}] = useMutation(updateDeviceInfo);
  async function handleSubmit(data: LatLng[]) {
    if (params?.deviceID) {
      await mutate({
        deviceID: params.deviceID,
        alertConfig: {
          alertPolygon: data.map((pl) => ({
            latitude: pl.lat,
            longitude: pl.lng,
          })),
        },
      });
    }
  }
  return (
    <StyledContainer>
      <SafeZoneAlertMap
        initialData={[]}
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div``;

export default AlertZone;
