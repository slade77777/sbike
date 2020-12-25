import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import {Device, LatLng} from 'shared-logic';
import GoogleMap from '../../components/GoogleMap';
import {apiIsLoaded} from '../../utils/googleMapUtils';
import {useAuthState} from '../../context/auth-context';
import InfoWindow from './InfoWindow';
import DevicesList from './DevicesList';

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

  function goToLocation(device: Device) {
    setSelectedDevice(device);
  }

  const {devices} = useAuthState();

  const places = useMemo(() => mappingData(devices || []), [devices]);

  useEffect(() => {
    if (state?.mapApiLoaded) {
      apiIsLoaded(state?.mapInstance, state?.mapApi, places);
      isFirst.current = false;
    }
  }, [places, state]);

  return (
    <StyledContainer>
      <StyledButton>
        <DevicesList onSelectDevice={goToLocation} />
      </StyledButton>
      <StyledGoogleMap>
        <GoogleMap
          defaultZoom={10}
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
        />
        {state?.mapApiLoaded && devices && (
          <InfoWindow
            devices={devices}
            map={state?.mapInstance}
            maps={state?.mapApi}
          />
        )}
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
  top: 0px;
  left: 0px;
  z-index: 9;
`;

export default Tracking;
