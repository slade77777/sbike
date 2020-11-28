import React, {FC} from 'react';
import {GoogleMap, Polyline} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '80vh',
  marginTop: 20,
};

type Props = {
  paths: Array<{
    let: number;
    lng: number;
  }>;
  altitude?: number;
};
const Map: FC<Props> = ({paths}) => {
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
  };
  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={paths?.[0] || {lat: 21.027763, lng: 105.83416}}
        zoom={18}>
        <Polyline path={paths} options={options} />
      </GoogleMap>
    </div>
  );
};

export default Map;
