import React, {FC, useEffect} from 'react';
import {Device} from 'shared-logic';
// @ts-ignore
import carPng from '../../images/car.png';
import {genInfoWindowContent} from '../../utils/googleMapUtils';

type Props = {
  maps: any;
  map: any;
  devices: Device[];
};
const InfoWindow: FC<Props> = ({maps, map, devices}) => {
  useEffect(() => {
    const markers: Array<any> = [];
    for (let device of devices) {
      const marker = new maps.Marker({
        position: {
          lat: device?.position?.latitude,
          lng: device?.position?.longitude,
        },
        map,
        icon: {
          url: carPng,
          scaledSize: new maps.Size(50, 50),
        },
      });
      markers.push(marker);
      const infoWindow = new maps.InfoWindow({
        content: genInfoWindowContent(
          {
            carNumber: device?.carNumber || '',
            expriedDate: device?.expriedDate || '',
          },
          device?.position,
        ),
      });
      infoWindow.open(map, marker);
      marker.addListener('mouseover', () => {
        infoWindow.open(map, marker);
      });
    }
    return () => {
      for (let mk of markers) {
        if (mk) {
          mk.setMap(null);
        }
      }
    };
  }, [
    devices,
    map,
    maps.Animation.DROP,
    maps.InfoWindow,
    maps.Marker,
    maps.Size,
  ]);

  return <></>;
};

export default InfoWindow;
