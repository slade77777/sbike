import React, {FC, useMemo, useState} from 'react';
import {Device, DeviceLocation} from 'shared-logic';
import {HANOI_LOCATION} from '../../contants/common';
import GoogleMap from '../../components/GoogleMap';
import useReportMap from './useReportMap';

type Props = {
  location: DeviceLocation | null;
  devices?: Array<Device>;
};

const ReportMap: FC<Props> = ({location, devices}) => {
  const [state, setState] = useState<{
    mapApiLoaded: boolean;
    mapInstance: any;
    mapApi: any;
  } | null>({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
  });

  const carNumber = useMemo(
    () =>
      devices?.find((dv) => dv.deviceID === location?.deviceID)?.carNumber ||
      '',
    [devices, location],
  );

  useReportMap(state?.mapInstance, state?.mapApi, location, carNumber);

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
