import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {Marker, Polyline} from '@react-google-maps/api';
import Map from '../../components/Map';

type Props = {
  paths: Array<{
    let: number;
    lng: number;
  }>;
  altitude?: number;
  velocity?: number;
  initialDate?: number;
};

const DeviceMap: FC<Props> = ({paths, velocity, initialDate}) => {
  const options = {
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
    paths: paths,
    zIndex: 1,
    geodesic: true,
  };

  const interval = useRef(0);
  const [state, setState] = useState([]);
  const newPaths = useMemo(() => {
    return (
      paths?.map((coordinates, i, array) => {
        if (i === 0) {
          return {...coordinates, distance: 0}; // it begins here!
        }
        const {lat: lat1, lng: lng1} = coordinates;
        const latLong1 = new window.google.maps.LatLng(lat1, lng1);

        const {lat: lat2, lng: lng2} = array[0];
        const latLong2 = new window.google.maps.LatLng(lat2, lng2);

        // in meters:
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          latLong1,
          latLong2,
        );

        return {...coordinates, distance};
      }) || []
    );
  }, [paths]);

  function getDistance() {
    // seconds between when the component loaded and now
    const differentInTime = (Date.now() - initialDate) / 1000; // pass to seconds
    return differentInTime * velocity; // d = v*t -- thanks Newton!
  }

  function moveObject() {
    const distance = getDistance();
    if (!distance) {
      return;
    }

    let progress = newPaths?.filter(
      (coordinates) => coordinates.distance < distance,
    );

    const nextLine = newPaths?.find(
      (coordinates) => coordinates.distance > distance,
    );
    if (!nextLine) {
      setState(progress);
      return; // it's the end!
    }
    const lastLine = progress[progress.length - 1];

    const lastLineLatLng = new window.google.maps.LatLng(
      lastLine.lat,
      lastLine.lng,
    );

    const nextLineLatLng = new window.google.maps.LatLng(
      nextLine.lat,
      nextLine.lng,
    );

    // distance of this line
    const totalDistance = nextLine.distance - lastLine.distance;
    const percentage = (distance - lastLine.distance) / totalDistance;

    const position = window.google.maps.geometry.spherical.interpolate(
      lastLineLatLng,
      nextLineLatLng,
      percentage,
    );

    progress = progress.concat(position);
    setState(progress);
  }

  useEffect(() => {
    interval.current = window.setInterval(moveObject, 100);
    return () => {
      window.clearInterval(interval.current);
    };
  }, [newPaths]);

  return (
    <div>
      <Map center={state?.[0]} zoom={16}>
        {state.length > 0 && <Marker position={state[state.length - 1]} />}
        <Polyline path={paths} options={options} />
      </Map>
    </div>
  );
};

export default DeviceMap;
