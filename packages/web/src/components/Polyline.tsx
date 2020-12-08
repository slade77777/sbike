import React, {FC, useEffect, useMemo, useRef} from 'react';
import {Button} from 'antd';

type LatLong = {
  lat: number;
  lng: number;
};

type Props = {
  paths: Array<LatLong>;
  maps: any;
  map: any;
};

const PATH_STYLES = {
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
  zIndex: 1,
  geodesic: true,
};

function genIcons(maps: any) {
  return [
    {
      icon: {
        path: maps?.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 4,
        strokeColor: '#393',
      },
      offset: '0%',
    },
  ];
}

function createHistoryPath(maps: any, paths: Array<LatLong>) {
  return new maps.Polyline({
    path: paths,
    ...PATH_STYLES,
  });
}

function createMovingLine(maps: any, map: any, icons: Array<any>) {
  return new maps.Polyline({
    icons,
    map,
  });
}

const Polyline: FC<Props> = ({paths, map, maps}) => {
  const intervalId = useRef(0);
  const iconsRef = useRef(genIcons(maps));

  const historyPath = useMemo(() => createHistoryPath(maps, paths), [
    maps,
    paths,
  ]);

  const movingLine = useMemo(
    () => createMovingLine(maps, map, iconsRef.current),
    [map, maps],
  );

  useEffect(() => {
    historyPath.setMap(map);
    return () => {
      historyPath.setMap(null);
    };
  }, [historyPath, map, maps.Polyline, paths]);

  function startPlayback() {
    movingLine.setPath(paths);
    let count = 0;
    intervalId.current = setInterval(() => {
      count = (count + 1) % 200;

      const icons = movingLine.get('icons');
      icons[0].offset = count / 2 + '%';
      movingLine.set('icons', icons);
    }, 100);
  }

  return (
    <div>
      <Button onClick={startPlayback}>Start </Button>
    </div>
  );
};

export default Polyline;
