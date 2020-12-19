import React, {FC, useMemo} from 'react';
// import {Button, Space} from 'antd';
import {useParams} from 'react-router-dom';
import {message, Spin} from 'antd';
import {useMutation} from 'react-query';
import {LatLng, updateDeviceInfo, useDeviceId} from 'shared-logic';
import styled from 'styled-components';
import SafeZoneAlertMap from './SafeZoneAlertMap';

type Props = {};

const AlertZone: FC<Props> = () => {
  const params = useParams<{deviceID: string}>();
  const deviceRes = useDeviceId(params?.deviceID);
  const [mutate, {isLoading}] = useMutation(updateDeviceInfo, {
    onSuccess: () => {
      message.success('Thiết lập thành công!');
    },
    onError: () => {
      message.error('Có lỗi xảy ra!');
    },
  });

  const device = useMemo(() => deviceRes?.data?.data, [deviceRes]);
  const initPolygon = useMemo(
    () => deviceRes?.data?.data?.alertConfig?.alertPolygon,
    [deviceRes],
  );

  async function handleSubmit(data: LatLng[]) {
    if (device) {
      await mutate({
        ...device,
        alertConfig: {
          ...device?.alertConfig,
          alertPolygon: data.map((pl) => ({
            latitude: pl.lat,
            longitude: pl.lng,
          })),
        },
      });
    }
  }
  return (
    <Spin spinning={deviceRes.isLoading}>
      <StyledContainer>
        <SafeZoneAlertMap
          initialData={
            initPolygon?.map((pl) => ({lat: pl.latitude, lng: pl.longitude})) ||
            []
          }
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
        />
      </StyledContainer>
    </Spin>
  );
};

const StyledContainer = styled.div``;

export default AlertZone;
