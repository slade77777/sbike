import {LatLng} from 'shared-logic';
import {MAP_PATH_STYLES} from '../contants/common';

export function genIcons(maps: any) {
  return [
    {
      icon: {
        path: maps?.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 4,
        strokeColor: '#fc8621',
        fillColor: '#fc8621',
      },
      offset: '100%',
    },
  ];
}

export function createHistoryPath(maps: any, paths: Array<LatLng>) {
  return new maps.Polyline({
    path: paths.map((p) => ({lat: p.lat, lng: p.lng})),
    ...MAP_PATH_STYLES,
  });
}

export function createMovingLine(maps: any, map: any, icons: Array<any>) {
  return new maps.Polyline({
    icons,
    map,
    strokeColor: 'transparent',
    zIndex: 5,
  });
}

// Return map bounds based on list of places
export const getMapBounds = (_map: any, maps: any, places: Array<LatLng>) => {
  const bounds = new maps.LatLngBounds();
  for (let i = 0; i < places.length; i++) {
    bounds.extend(new maps.LatLng(places[i].lat, places[i].lng));
  }
  return bounds;
};

// Re-center map when resizing the window
export const bindResizeListener = (map: any, maps: any, bounds: any) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
export const apiIsLoaded = (map: any, maps: any, places: Array<LatLng>) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};
