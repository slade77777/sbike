import React, {FC} from 'react';
import {Polyline} from '@react-google-maps/api';
import Map from '../../components/Map';

type Props = {
  paths: Array<{
    let: number;
    lng: number;
  }>;
  altitude?: number;
};
const DeviceMap: FC<Props> = ({paths}) => {
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
  return (
    <div>
      <Map>
        <Polyline path={paths} options={options} />
      </Map>
    </div>
  );
};

export default DeviceMap;
