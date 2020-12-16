import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {DeviceLocation} from 'shared-logic';
import styled from 'styled-components';
import {PlayCircleFilled, PauseCircleFilled} from '@ant-design/icons';
import {Button} from 'antd';
import {
  createHistoryPath,
  genInfoWindowContent,
} from '../../utils/googleMapUtils';
import ProcessPath from './ProcessPath';

type Props = {
  locations: Array<DeviceLocation>;
  maps: any;
  map: any;
  deviceInfo?: {
    carNumber: string;
    expriedDate: string;
  };
};

const DEFAULT_SPEED = 500;

enum SpeedEnum {
  NORMAL = 1,
  X2 = 2,
  X4 = 4,
  X8 = 8,
}

const SPEED_BUTTONS = [
  {speed: SpeedEnum.NORMAL, label: '1'},
  {speed: SpeedEnum.X2, label: '2x'},
  {speed: SpeedEnum.X4, label: '4x'},
  {speed: SpeedEnum.X8, label: '8x'},
];

function fitMap(maps: any, map: any, paths: Array<any>) {
  const bounds = new maps.LatLngBounds();
  for (let i = 0; i < paths.length; i++) {
    bounds.extend(paths[i]);
  }
  map.fitBounds(bounds);
}

const ViewHistory: FC<Props> = ({locations, deviceInfo, map, maps}) => {
  const [isMoving, setIsMoving] = useState(false);
  const intervalId = useRef(0);
  // const iconsRef = useRef(genIcons(maps));
  const countRef = useRef(0);
  const [percent, setPercent] = useState(0);
  const [speed, setSpeed] = useState(SpeedEnum.NORMAL);

  const paths = useMemo(
    () =>
      locations?.map((dt: any) => ({
        lat: dt.latitude,
        lng: dt.longitude,
        direction: dt.direction,
      })),
    [locations],
  );

  const historyPath = useMemo(() => createHistoryPath(maps, paths), [
    maps,
    paths,
  ]);

  const infoWindow = useMemo(
    () =>
      new maps.InfoWindow({
        content: genInfoWindowContent(deviceInfo, locations?.[0]),
      }),
    [deviceInfo, locations, maps.InfoWindow],
  );

  const marker = useMemo(
    () =>
      new maps.Marker({
        position: paths[0],
        icon: {
          path: maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 4,
          strokeColor: '#fc8621',
          fillColor: '#fc8621',
          rotation: 90,
        },
      }),
    [maps.Marker, maps.SymbolPath.FORWARD_CLOSED_ARROW, paths],
  );

  useEffect(() => {
    fitMap(maps, map, paths);
    historyPath.setMap(map);
    const mkIcon = marker.getIcon();

    if (countRef.current < 1) {
      mkIcon.rotation = paths[0].direction;
      marker.setIcon(mkIcon);
    }

    marker.setMap(map);
    infoWindow.open(map, marker);

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    return () => {
      historyPath.setMap(null);
      marker.setMap(null);
      infoWindow.close();
    };
  }, [historyPath, infoWindow, map, maps, maps.Polyline, marker, paths]);

  function animateCar(newSpeed: SpeedEnum) {
    if (intervalId.current) {
      window.clearInterval(intervalId.current);
    }

    if (countRef.current === paths.length) {
      countRef.current = 0;
    }

    let panCount = 0;

    intervalId.current = window.setInterval(() => {
      // Check this point is inside map bound
      if (!map.getBounds().contains(paths[countRef.current])) {
        panCount = panCount + 1;
      } else {
        panCount = 0;
      }
      if (panCount === 1) {
        map.panTo(paths[countRef.current]);
      }
      // end check inside map

      //set rotation
      const mkIcon = marker.getIcon();
      mkIcon.rotation = paths[countRef.current].direction;
      marker.setIcon(mkIcon);
      //End rotation

      //Move marker and infoWindow
      marker.setPosition(paths[countRef.current]);
      infoWindow.setContent(
        genInfoWindowContent(deviceInfo, locations[countRef.current]),
      );

      countRef.current = countRef.current + 1;

      //Stop if reach to end point
      if (countRef.current === paths.length) {
        clearInterval(intervalId.current);
        setIsMoving(false);
      }
      setPercent(countRef.current);
    }, DEFAULT_SPEED / newSpeed);
  }

  function stop() {
    window.clearInterval(intervalId.current);
    setIsMoving(false);
  }

  const onChangeValue = useCallback(
    (vl: number) => {
      const mkIcon = marker.getIcon();
      mkIcon.rotation = paths[vl].direction;
      marker.setIcon(mkIcon);
      marker.setPosition(paths[vl]);

      countRef.current = vl;
      setPercent(vl);
    },
    [marker, paths],
  );

  function start() {
    animateCar(speed);
    setIsMoving(true);
  }

  function changeSpeed(xTimes: SpeedEnum) {
    if (isMoving) {
      animateCar(xTimes);
    }
    setSpeed(xTimes);
  }

  return (
    <StyledController>
      <Button
        shape="circle"
        onClick={isMoving ? stop : start}
        icon={
          isMoving ? (
            <PauseCircleFilled style={{fontSize: 24}} />
          ) : (
            <PlayCircleFilled style={{fontSize: 24}} />
          )
        }
        type="link"
        size="small"
      />
      <ProcessPath
        value={percent}
        steps={paths.length}
        onChange={onChangeValue}
      />
      {SPEED_BUTTONS.map((btn) => (
        <Button
          size="small"
          key={btn.label}
          type={speed === btn.speed ? 'primary' : 'default'}
          onClick={() => changeSpeed(btn.speed)}>
          {btn.label}
        </Button>
      ))}
    </StyledController>
  );
};

const StyledController = styled.div`
  position: absolute;
  border-radius: 2px;
  bottom: 50px;
  left: 50%;
  width: 50%;
  padding: 6px;
  background-color: rgba(255, 255, 255, 1);
  transform: translateX(-50%);
  z-index: 10;
  display: grid;
  grid-template-columns: 24px auto repeat(${SPEED_BUTTONS.length}, 32px);
  align-items: center;
  grid-gap: 10px;
  box-shadow: 0 2px 8px #f0f1f2;
`;

export default ViewHistory;
