import React, {FC, useEffect, useMemo, useState} from 'react';
// import {Button, Space} from 'antd';
import {useParams} from 'react-router-dom';
import {Spin} from 'antd';
import {LatLng, useDeviceId} from 'shared-logic';
import styled from 'styled-components';
import useAlertMutation from '../useAlertMutation';
import SafeZoneAlertMap from './SafeZoneAlertMap';

type Props = {};

const AlertZone: FC<Props> = () => {
  const params = useParams<{deviceID: string}>();
  const deviceRes = useDeviceId(params?.deviceID);

  const device = useMemo(() => deviceRes?.data?.data, [deviceRes]);
  const [polygon, setPolygon] = useState<LatLng[]>([]);

  useEffect(() => {
    if (device) {
      const mappedPoly = device.alertConfig?.alertPolygon?.map((pl) => ({
        lat: pl.latitude,
        lng: pl.longitude,
      }));
      setPolygon(mappedPoly || []);
    }
  }, [device]);

  const {onSubmit, isLoading} = useAlertMutation(device || {});

  async function handleSubmit(data: LatLng[]) {
    if (device) {
      const mappedPoly = data.map((pl) => ({
        latitude: pl.lat,
        longitude: pl.lng,
      }));
      await onSubmit({
        ...device,
        alertConfig: {
          ...device.alertConfig,
          alertPolygon: mappedPoly,
        },
      });
      setPolygon(data);
    }
  }

  return (
    <Spin spinning={deviceRes.isLoading}>
      <StyledContainer>
        <SafeZoneAlertMap
          initialData={polygon}
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
        />
      </StyledContainer>
    </Spin>
  );
};

const StyledContainer = styled.div``;

export default AlertZone;
