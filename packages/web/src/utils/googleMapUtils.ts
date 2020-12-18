import {DeviceLocation, format, LatLng} from 'shared-logic';
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

export interface InfoWindowContent extends DeviceLocation {
  carNumber?: string;
  expriedDate?: string;
}

export const genInfoWindowContent = (
  info?: {
    carNumber?: string;
    expriedDate?: string;
  },
  location?: DeviceLocation,
) =>
  info
    ? `
    <div class="sbike-window-info">
        <div><span class="label">Biển số: </span><span class="bold">${
          info?.carNumber
        }</span></div>
        <div><span class="value">${format(
          location?.deviceTime,
          'HH:mm:ss DD/MM/YYYY',
        )}</span></div>
        <p><span class="label">Tốc độ: </span> <span class="value">${
          location?.speed
        }</span> km/h</p>
        <div>
          <span class="label">Tọa độ: </span><span class="value">${
            location?.latitude
          }, ${location?.longitude}</span>
        </div>
        <div><span class="label">Cường độ sóng (GSM, GPS): </span><span class="value">${
          location?.csq
        }</span></div>
        <div><span class="label">Động cơ: </span><span class="value">${
          (location?.status! & 1) == 0
            ? '<span class="device-off">Tắt</span>'
            : '<span class="device-on">Bật</span>'
        }</span></div>
        <div><span class="label">Điện áp ắc quy: </span><span class="value">${
          location?.batteryVoltage
        }</span></div>
        <div><span class="label">Ngày hết hạn: </span><span class="value">${format(
          info?.expriedDate,
        )}</span></div>
      </div>
  `
    : null;

const polyOptions = {
  fillColor: '#CD0000',
  strokeWeight: 0,
  fillOpacity: 0.45,
  editable: true,
};

export function initDrawingManager(maps: any) {
  if (!maps) {
    return;
  }
  return new maps.drawing.DrawingManager({
    drawingMode: maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: maps.ControlPosition.TOP_CENTER,
      drawingModes: [maps.drawing.OverlayType.POLYGON],
    },
    polylineOptions: {
      editable: true,
    },
    rectangleOptions: polyOptions,
    circleOptions: polyOptions,
    polygonOptions: polyOptions,
  });
}
