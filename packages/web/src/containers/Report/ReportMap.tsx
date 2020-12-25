import React, {FC, useMemo, useState} from 'react';
import {AlertPolygon, DeviceLocation, useDeviceId} from 'shared-logic';
import {HANOI_LOCATION} from '../../contants/common';
import GoogleMap from '../../components/GoogleMap';
import {useAuthState} from '../../context/auth-context';
import useReportMap from './useReportMap';

type Props = {
  location: DeviceLocation | null;
  selectedDeviceID?: string;
  safeZoneLatLong?: Array<AlertPolygon>;
};

const ReportMap: FC<Props> = ({selectedDeviceID, location}) => {
  const [state, setState] = useState<{
    mapApiLoaded: boolean;
    mapInstance: any;
    mapApi: any;
  } | null>({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
  });

  const {devices} = useAuthState();

  const deviceByIdRes = useDeviceId(selectedDeviceID || '');

  const carNumber = useMemo(
    () =>
      devices?.find((dv) => dv.deviceID === location?.deviceID)?.carNumber ||
      '',
    [devices, location],
  );

  const alertPolygon = useMemo(
    () => deviceByIdRes?.data?.data?.alertConfig?.alertPolygon || [],
    [deviceByIdRes],
  );

  useReportMap(
    state?.mapInstance,
    state?.mapApi,
    location,
    carNumber,
    alertPolygon,
  );

  return (
    <GoogleMap
      defaultZoom={12}
      resetBoundsOnResize
      defaultCenter={HANOI_LOCATION}
      center={{
        lat: location?.latitude || HANOI_LOCATION.lat,
        lng: location?.longitude || HANOI_LOCATION.lng,
      }}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map, maps}) =>
        setState({
          mapApiLoaded: true,
          mapInstance: map,
          mapApi: maps,
        })
      }
    />
  );
};

export default ReportMap;
