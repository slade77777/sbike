import {useEffect, useMemo} from 'react';
import {DeviceLocation} from 'shared-logic';
import {genInfoWindowContent} from '../../utils/googleMapUtils';

// @ts-ignore
import carPng from '../../images/car.png';

export default (
  map: any,
  maps: any,
  location: DeviceLocation | null,
  carNumber: string,
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
};
