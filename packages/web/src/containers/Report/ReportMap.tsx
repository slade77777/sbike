import React, {FC, useState} from 'react';
import {LatLng} from 'shared-logic';
import {HANOI_LOCATION} from '../../contants/common';
import GoogleMap from '../../components/GoogleMap';
import CarSVG from '../../images/car.svg';

type Props = {
  location: LatLng | null;
};

const Marker = ({children}) => children;

const ReportMap: FC<Props> = ({location}) => {
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
    <GoogleMap
      defaultZoom={12}
      resetBoundsOnResize
      defaultCenter={HANOI_LOCATION}
      center={location || HANOI_LOCATION}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map, maps}) =>
        setState({
          mapApiLoaded: true,
          mapInstance: map,
          mapApi: maps,
        })
      }>
      <Marker {...location}>
        <CarSVG width={50} />
      </Marker>
    </GoogleMap>
  );
};

export default ReportMap;
