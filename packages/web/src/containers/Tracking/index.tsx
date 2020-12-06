import React, {FC, useState} from 'react';
import DevicesDropDown from '../Devices/DevicesDropDown';
import GoogleMap from '../../components/GoogleMap';
import Marker from '../../components/Marker';

const defaultPosition = {
  lat: 20.967585,
  lng: 105.83451,
};

const getMapBounds = (_: any, maps: any, places: any) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place: any) => {
    bounds.extend(new maps.LatLng(place.lat, place.lng));
  });
  return bounds;
};

const bindResizeListener = (map: any, maps: any, bounds: any) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

const apiIsLoaded = (map: any, maps: any, places: any) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

const Tracking: FC = () => {
  const [position, setPosition] = useState(defaultPosition);
  return (
    <div>
      <DevicesDropDown
        onSelectDevice={(pos) =>
          setPosition({
            lat: pos.latitude,
            lng: pos.longitude,
          })
        }
      />
      <GoogleMap
        defaultZoom={10}
        resetBoundsOnResize
        defaultCenter={defaultPosition}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) => apiIsLoaded(map, maps, [position])}>
        <Marker text="test" {...position} />
      </GoogleMap>
    </div>
  );
};

export default Tracking;
