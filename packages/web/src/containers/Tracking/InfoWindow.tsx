import React, {FC, useEffect} from 'react';
import {Device, format} from 'shared-logic';
// @ts-ignore
import carPng from '../../images/car.png';

const content = (device: Device) => `
    <div>
        <div>Biển số: <strong>${device.carNumber}</strong></div>
        <div>${format(
          device?.position?.deviceTime,
          'HH:mm:ss DD/MM/YYYY',
        )}</div>
        <p>Tốc độ: ${device?.position?.speed}</p>
        <div>
          Tọa độ: ${device?.position?.latitude}, ${device?.position?.longitude}
        </div>
        <div>Cường độ sóng (GSM, GPS): ${device?.position?.csq}</div>
        <div>Động cơ: ${device?.position?.status}</div>
        <div>Điện áp ắc quy: ${device?.position?.batteryVoltage}</div>
        <div>Ngày hết hạn: ${format(device?.expriedDate)}</div>
      </div>
  `;

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
        content: content(device),
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
