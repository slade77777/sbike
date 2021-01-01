import React, {FC, useState} from 'react';
import styled from 'styled-components';
import {DayType, DeviceLocation} from 'shared-logic';
import {HANOI_LOCATION} from '../../contants/common';
import GoogleMap from '../../components/GoogleMap';
import ViewHistory from './ViewHistory';

type Props = {
  info: React.ReactNode;
  locations?: Array<DeviceLocation>;
  deviceInfo?: {
    carNumber: string;
    expriedDate: DayType;
  };
};

const DetailWrapper: FC<Props> = ({locations, deviceInfo, info}) => {
  const [state, setState] = useState<{
    mapApiLoaded: boolean;
    mapInstance: any;
    mapApi: any;
  } | null>({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
  });

  return (
    <>
      {state && info}
      <StyledGoogleWrapper>
        <GoogleMap
          defaultZoom={12}
          resetBoundsOnResize
          defaultCenter={HANOI_LOCATION}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map, maps}) =>
            setState({
              mapApiLoaded: true,
              mapInstance: map,
              mapApi: maps,
            })
          }
        />
        {state && locations && locations.length > 0 && (
          <ViewHistory
            locations={locations}
            deviceInfo={deviceInfo}
            map={state.mapInstance}
            maps={state.mapApi}
          />
        )}
      </StyledGoogleWrapper>
    </>
  );
};

const StyledGoogleWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 58px);
  position: relative;
`;

export default DetailWrapper;
