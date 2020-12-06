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
  }, 100);
}

const Polyline: FC<Props> = ({paths}) => {
  const mapRef = useRef(null);
  const mapApiRef = useRef(null);

  useEffect(() => {
    let flightPath: any = null;
    if (mapRef.current && mapApiRef.current) {
      flightPath = new mapApiRef.current.Polyline({
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
      flightPath.setMap(mapRef.current);
    }
    return () => {
      flightPath?.setMap(null);
    };
  }, [paths]);

  useEffect(() => {
    if (mapApiRef.current) {
      const lineSymbol = {
        path: mapApiRef.current.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 4,
        strokeColor: '#393',
      };
      const line = new mapApiRef.current.Polyline({
        path: paths,
        icons: [
          {
            icon: lineSymbol,
            offset: '100%',
          },
        ],
        map: mapRef.current,
      });

      animateCircle(line);
    }
  }, [paths]);

  return (
    <div>
      <GoogleMap
        defaultZoom={15}
        center={paths?.[0]}
        resetBoundsOnResize
        defaultCenter={HANOI_LOCATION}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) => {
          mapRef.current = map;
          mapApiRef.current = maps;
        }}
      />
    </div>
  );
};

export default Polyline;
