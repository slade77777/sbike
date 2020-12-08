import React, {FC, useMemo, useState} from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';
import {getDeviceByCompany, LatLng, useUserInfo} from 'shared-logic';
import DevicesDropDown from '../Devices/DevicesDropDown';
import GoogleMap from '../../components/GoogleMap';
import CarSVG from '../../images/car.svg';

const defaultPosition = {
  lat: 21.027763,
  lng: 105.83416,
};

const Marker: FC<{children: React.ReactNode}> = ({children}) => children;

// Return map bounds based on list of places
const getMapBounds = (_: any, maps: any, places: Array<LatLng>) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(place.lat, place.lng));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map: any, maps: any, bounds: any) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

const apiIsLoaded = (map: any, maps: any, places: Array<LatLng>) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

const Tracking: FC = () => {
  const [position, setPosition] = useState(defaultPosition);

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

  const places = useMemo(
    () =>
      data?.data?.map((dv) => ({
        lat: dv?.position?.latitude,
        lng: dv?.position?.longitude,
      })) || [],
    [data],
  );

  return (
    <StyledContainer>
      <StyledButton>
        <DevicesDropDown onSelectDevice={goToLocation} />
      </StyledButton>
      <StyledGoogleMap>
        <GoogleMap
          defaultZoom={12}
          center={position || defaultPosition}
          defaultCenter={defaultPosition}>
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
