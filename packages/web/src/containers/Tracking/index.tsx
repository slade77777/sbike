import React, {FC, useState} from 'react';
import {Card} from 'antd';
import {Marker} from '@react-google-maps/api';
import Map from '../../components/Map';
import DevicesDropDown from '../Devices/DevicesDropDown';

const defaultPosition = {
  lat: 20.967585,
  lng: 105.83451,
};

const Tracking: FC = () => {
  const [position, setPosition] = useState(defaultPosition);
  console.log(position);
  return (
    <Card>
      <DevicesDropDown
        onSelectDevice={(pos) =>
          setPosition({
            lat: pos.latitude,
            lng: pos.longitude,
          })
        }
      />
      <Map>
        <Marker position={position} />
      </Map>
    </Card>
  );
};

export default Tracking;
