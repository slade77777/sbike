import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';
import {Device, getDeviceByCompany, LatLng, useUserInfo} from 'shared-logic';
import DevicesDropDown from '../Devices/DevicesDropDown';
import GoogleMap from '../../components/GoogleMap';
import {apiIsLoaded} from '../../utils/googleMapUtils';
// @ts-ignore
import CarSVG from '../../images/car.svg';

import InfoWindow from './InfoWindow';

const defaultPosition = {
  lat: 21.027763,
  lng: 105.83416,
};

function mappingData(data: Array<Device>): Array<LatLng> {
  return (
    data
      .map((dv) => ({
        lat: dv?.position?.latitude || 0,
        lng: dv?.position?.longitude || 0,
        direction: dv?.position?.direction || 0,
      }))
      ?.filter((lc) => lc.lng && lc.lat) || []
  );
}
const Marker: FC<{
  children: any;
  lat: number;
  lng: number;
}> = ({children}) => children;

const Tracking: FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const isFirst = useRef(true);
  const [state, setState] = useState<{
    mapApiLoaded: boolean;
    mapInstance: any;
    mapApi: any;
  } | null>({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
  });
  const [showInfo, setShowInfo] = useState<string>('');

  function goToLocation(device: Device) {
    setSelectedDevice(device);
  }

  const userRes = useUserInfo();
  const {data} = useQuery(
    [
      'companyDevice',
      userRes.data?.data?.companyID && userRes.data.data.companyID,
    ],
    getDeviceByCompany,
  );

  const places = useMemo(() => mappingData(data?.data || []), [data]);

  useEffect(() => {
    if (state?.mapApiLoaded) {
      apiIsLoaded(state?.mapInstance, state?.mapApi, places);
      isFirst.current = false;
    }
  }, [places, state]);

  function onChildClickCallback(key: string) {
    const foundKey = data?.data?.find((dt) => dt.deviceID === key);
    setShowInfo(foundKey?.deviceID || '');
  }

  return (
    <StyledContainer>
      <StyledButton>
        <DevicesDropDown onSelectDevice={goToLocation} />
      </StyledButton>
      <StyledGoogleMap>
        <GoogleMap
          defaultZoom={12}
          center={
            {
              lat: selectedDevice?.position?.latitude || 0,
              lng: selectedDevice?.position?.longitude || 0,
            } || defaultPosition
          }
          defaultCenter={defaultPosition}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map, maps}) =>
            setState({
              mapInstance: map,
              mapApi: maps,
              mapApiLoaded: true,
            })
          }
          onChildClick={onChildClickCallback}>
          {data?.data?.map((device) => (
            <Marker
              key={device.deviceID}
              lat={device?.position?.latitude || 0}
              lng={device?.position?.longitude || 0}>
              <CarSVG width={40} />
              {selectedDevice?.carNumber === device.carNumber ||
              showInfo === device.deviceID ? (
                <InfoWindow device={device} />
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      </StyledGoogleMap>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
`;

const StyledGoogleMap = styled.div`
  height: 100vh;
`;

const StyledButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 9;
`;

export default Tracking;
