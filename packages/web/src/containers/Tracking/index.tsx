import React, {FC, useState} from 'react';
import DevicesDropDown from '../Devices/DevicesDropDown';
import GoogleMap from '../../components/GoogleMap';
// import Marker from '../../components/Marker';
import styled from 'styled-components';
import {HANOI_LOCATION} from '../../contants/common';
import CarSVG from '../../images/car.svg';

const defaultPosition = {
  lat: 21.027763,
  lng: 105.83416,
};

const Marker = ({children}) => children;

// const getMapBounds = (_: any, maps: any, places: any) => {
//   const bounds = new maps.LatLngBounds();
//
//   places.forEach((place: any) => {
//     bounds.extend(new maps.LatLng(place.lat, place.lng));
//   });
//   return bounds;
// };

// const bindResizeListener = (map: any, maps: any, bounds: any) => {
//   maps.event.addDomListenerOnce(map, 'idle', () => {
//     maps.event.addDomListener(window, 'resize', () => {
//       map.fitBounds(bounds);
//     });
//   });
// };

// const apiIsLoaded = (map: any, maps: any, places: any) => {
//   // Get bounds by our places
//   const bounds = getMapBounds(map, maps);
//   // Fit map to bounds
//   map.fitBounds(bounds);
//   // Bind the resize listener
//   bindResizeListener(map, maps, bounds);
// };

const Tracking: FC = () => {
  const [position, setPosition] = useState(defaultPosition);
  return (
    <StyledContainer>
      <StyledButton>
        <DevicesDropDown
          onSelectDevice={(pos) =>
            setPosition({
              lat: pos.latitude,
              lng: pos.longitude,
            })
          }
        />
      </StyledButton>
      <GoogleMap
        defaultZoom={17}
        center={position}
        defaultCenter={defaultPosition}>
        <Marker {...position}>
          <CarSVG width={30} />
        </Marker>
      </GoogleMap>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
`;

const StyledButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 9;
`;

export default Tracking;
