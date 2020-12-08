import React, {FC, useRef, useState} from 'react';
import {LatLng} from 'shared-logic';
import GoogleMap from '../../components/GoogleMap';
import {HANOI_LOCATION} from '../../contants/common';
import Polyline from '../../components/Polyline';

type Props = {
  data: Array<LatLng>;
};

const ViewHistory: FC<Props> = ({data}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<{
    map: any;
    maps: any;
  } | null>(null);
  return (
    <>
      <GoogleMap
        defaultZoom={15}
        center={data[0]}
        resetBoundsOnResize
        defaultCenter={HANOI_LOCATION}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) => {
          mapRef.current = {map, maps};
          setMapLoaded(true);
        }}
      />
      {mapLoaded && (
        <Polyline
          paths={data}
          maps={mapRef.current?.maps}
          map={mapRef.current?.map}
        />
      )}
    </>
  );
};

export default ViewHistory;
