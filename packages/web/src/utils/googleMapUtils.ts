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
    path: paths,
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
