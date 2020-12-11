import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';
import {Device, getDeviceByCompany, LatLng, useUserInfo} from 'shared-logic';
import DevicesDropDown from '../Devices/DevicesDropDown';
import GoogleMap from '../../components/GoogleMap';
import {apiIsLoaded} from '../../utils/googleMapUtils';

// @ts-ignore
import CarSVG from '../../images/car.svg';

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
      }))
      ?.filter((lc) => lc.lng && lc.lat) || []
  );
}
const Marker: FC<{children: any}> = ({children}) => children;

const Tracking: FC = () => {
  const [position, setPosition] = useState(defaultPosition);
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

  function goToLocation(pos: LatLng) {
    setPosition(pos);
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

  return (
    <StyledContainer>
      <StyledButton>
        <DevicesDropDown onSelectDevice={goToLocation} />
      </StyledButton>
      <StyledGoogleMap>
        <GoogleMap
          defaultZoom={12}
          center={position || defaultPosition}
          defaultCenter={defaultPosition}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map, maps}) =>
            setState({
              mapInstance: map,
              mapApi: maps,
              mapApiLoaded: true,
            })
          }>
          {places.map((place, index) => (
            <Marker key={index} {...place}>
              <CarSVG width={40} />
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
