import {useEffect, useMemo} from 'react';
import {AlertPolygon, DeviceLocation} from 'shared-logic';
import {genInfoWindowContent, polyOptions} from '../../utils/googleMapUtils';

// @ts-ignore
import carPng from '../../images/car.png';

export default (
  map: any,
  maps: any,
  location: DeviceLocation | null,
  carNumber: string,
  safeZone?: Array<AlertPolygon>,
) => {
  const infoWindow = useMemo(
    () =>
      location && maps
        ? new maps.InfoWindow({
            content: genInfoWindowContent({carNumber}, location),
          })
        : null,
    [carNumber, location, maps],
  );

  const polygon = useMemo(
    () =>
      maps && safeZone
        ? new maps.Polygon({
            paths: safeZone.map((p) => ({
              lat: p.latitude,
              lng: p.longitude,
            })),
            ...polyOptions,
            editable: false,
          })
        : null,
    [maps, safeZone],
  );

  const marker = useMemo(
    () =>
      maps && map
        ? new maps.Marker({
            position: {
              lat: location?.latitude,
              lng: location?.longitude,
            },
            icon: {
              url: carPng,
              scaledSize: new maps.Size(50, 50),
            },
          })
        : null,
    [location?.latitude, location?.longitude, map, maps],
  );
  useEffect(() => {
    if (infoWindow && marker && map) {
      marker.setMap(map);
      infoWindow.open(map, marker);
    }
    return () => {
      if (marker && infoWindow) {
        marker.setMap(null);
        infoWindow.close();
      }
    };
  }, [infoWindow, map, marker]);

  useEffect(() => {
    if (map) {
      polygon.setMap(map);
    }
    return () => {
      if (polygon) {
        polygon.setMap(null);
      }
    };
  }, [map, polygon]);
};
