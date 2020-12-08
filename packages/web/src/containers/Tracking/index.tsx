import React, {FC, useState} from 'react';
import styled from 'styled-components';
import DevicesDropDown from '../Devices/DevicesDropDown';
import GoogleMap from '../../components/GoogleMap';
import CarSVG from '../../images/car.svg';

const defaultPosition = {
  lat: 21.027763,
  lng: 105.83416,
};

const Marker: FC<{children: React.ReactNode}> = ({children}) => children;

const Tracking: FC = () => {
  const [position, setPosition] = useState(defaultPosition);

  function goToLocation(pos: {latitude: number; longitude: number}) {
    setPosition({
      lat: pos.latitude,
      lng: pos.longitude,
    });
  }

  return (
    <StyledContainer>
      <StyledButton>
        <DevicesDropDown onSelectDevice={goToLocation} />
      </StyledButton>
      <StyledGoogleMap>
        <GoogleMap
          defaultZoom={14}
          center={position}
          defaultCenter={defaultPosition}>
          <Marker {...position}>
            <CarSVG width={40} />
          </Marker>
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
