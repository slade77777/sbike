import React, {FC, useEffect, useRef} from 'react';
import {HANOI_LOCATION} from '../contants/common';
import GoogleMap from './GoogleMap';

type Props = {
  paths: Array<{
    lat: number;
    lng: number;
  }>;
};

function animateCircle(line: any) {
  let count = 0;
  window.setInterval(() => {
    count = (count + 1) % 200;

    const icons = line.get('icons');
    icons[0].offset = count / 2 + '%';
    line.set('icons', icons);
  }, 20);
}

const Polyline: FC<Props> = ({paths}) => {
  const mapRef = useRef<{
    map: any;
    maps: any;
  }>({map: null, maps: null});

  useEffect(() => {
    if (mapRef.current && mapRef.current.maps) {
      const flightPath = new mapRef.current.maps.Polyline({
        path: paths,
        strokeColor: '#4dff4d',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#4dff4d',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 3000,
        zIndex: 1,
        geodesic: true,
      });
      flightPath?.setMap(mapRef.current.map);
    }
  }, [paths]);

  useEffect(() => {
    if (mapRef.current.maps) {
      const lineSymbol = {
        path: mapRef.current.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: '#393',
      };
      const line = new mapRef.current.maps.Polyline({
        path: paths,
        icons: [
          {
            icon: lineSymbol,
            offset: '100%',
          },
        ],
        map: mapRef.current.map,
      });

      animateCircle(line);
    }
  }, [paths]);

  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        resetBoundsOnResize
        defaultCenter={HANOI_LOCATION}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) => {
          mapRef.current = {
            map,
            maps,
          };
        }}
      />
    </div>
  );
};

export default Polyline;
