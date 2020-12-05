import React, {FC} from 'react';
import {GoogleMap, GoogleMapProps} from '@react-google-maps/api';
import {HANOI_LOCATION} from '../contants/common';

const defaultStyles = {
  width: '100%',
  height: '80vh',
  marginTop: 20,
};

const MAP_ZOOM = 15;

interface Props extends GoogleMapProps {
  children: React.ReactNode;
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  styles?: any;
}
const Map: FC<Props> = ({zoom, center, styles, children, ...props}) => {
  return (
    <div>
      <GoogleMap
        center={center || HANOI_LOCATION}
        zoom={zoom || MAP_ZOOM}
        mapContainerStyle={{...defaultStyles, ...styles}}
        {...props}>
        {children}
      </GoogleMap>
    </div>
  );
};

export default Map;
