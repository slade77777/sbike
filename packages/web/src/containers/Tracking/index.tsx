import React, {FC, useState} from 'react';
import styled from 'styled-components';
import {Device} from 'shared-logic';
import GoogleMap from '../../components/GoogleMap';
// import {apiIsLoaded} from '../../utils/googleMapUtils';
import {useAuthState} from '../../context/auth-context';

// @ts-ignore
import CarSvg from '../../images/car.svg';

import DevicesList from './DevicesList';
import InfoMaker from './InfoMaker';

const defaultPosition = {
  lat: 21.027763,
  lng: 105.83416,
};

const Tracking: FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
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
    state?.mapInstance?.setZoom(18);
    state?.mapInstance.panTo({
      lat: device?.position?.latitude,
      lng: device?.position?.longitude,
    });
  }

  const {devices} = useAuthState();

  return (
    <StyledContainer>
      <StyledButton>
        <DevicesList onSelectDevice={goToLocation} />
      </StyledButton>
      <StyledGoogleMap>
        <GoogleMap
          defaultZoom={12}
          defaultCenter={defaultPosition}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map, maps}) =>
            setState({
              mapInstance: map,
              mapApi: maps,
              mapApiLoaded: true,
            })
          }>
          {devices?.map((dv) => (
            <StyledMaker
              onClick={() => setSelectedDevice(dv)}
              key={dv.deviceID}
              lat={dv?.position?.latitude}
              lng={dv?.position?.longitude}>
              <CarSvg width={32} />
              {selectedDevice && selectedDevice.deviceID === dv.deviceID && (
                <StyledInfoWindow>
                  <InfoMaker device={selectedDevice} />
                </StyledInfoWindow>
              )}
            </StyledMaker>
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

type Props = {
  lat: number | undefined;
  lng: number | undefined;
};

const StyledMaker = styled.div<Props>`
  position: relative;
`;

const StyledInfoWindow = styled.div`
  position: absolute;
  bottom: 44px;
  left: 50%;
  transform: translateX(calc(-50% + 20px));
  z-index: 16;
`;

const StyledButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
`;

export default React.memo(Tracking);
