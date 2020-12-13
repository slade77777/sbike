import React, {FC, useState} from 'react';
import styled from 'styled-components';
import {LatLng} from 'shared-logic';
import {HANOI_LOCATION} from '../../contants/common';
import GoogleMap from '../../components/GoogleMap';
import ViewHistory from './ViewHistory';

type Props = {
  info: React.ReactNode;
  data?: Array<LatLng>;
};

const DetailWrapper: FC<Props> = ({data, info}) => {
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
          defaultZoom={15}
          center={data?.[0]}
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
        {state && data && data.length > 0 && (
          <ViewHistory
            paths={data.map((p) => new state.mapApi.LatLng(p.lat, p.lng))}
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
  height: calc(100vh - 107px);
  position: relative;
`;

export default DetailWrapper;
