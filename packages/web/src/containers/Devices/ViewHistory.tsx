import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {LatLng} from 'shared-logic';
import styled from 'styled-components';
import {PlayCircleFilled, PauseCircleFilled} from '@ant-design/icons';
import {Button} from 'antd';
import {
  createHistoryPath,
  createMovingLine,
  genIcons,
} from '../../utils/googleMapUtils';
import ProcessPath from './ProcessPath';

type Props = {
  paths: Array<LatLng>;
  maps: any;
  map: any;
};

const DEFAULT_STEPS = 1000;
const DEFAULT_SPEED = 100;

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

const ViewHistory: FC<Props> = ({paths, map, maps}) => {
  const [isMoving, setIsMoving] = useState(false);
  const intervalId = useRef(0);
  const iconsRef = useRef(genIcons(maps));
  const countRef = useRef(0);
  const mapBounds = useRef(map.getBounds());
  const [percent, setPercent] = useState(0);
  const [speed, setSpeed] = useState(SpeedEnum.NORMAL);
  const steps = paths?.length || DEFAULT_STEPS;

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
    const icons = movingLine.get('icons');
    if (!movingLine?.get('path')) {
      movingLine.setPath(paths);
    }
    if (countRef.current < 1) {
      icons[0].offset = '0%';
      movingLine.set('icons', icons);
    }
    return () => {
      historyPath.setMap(null);
      movingLine.setPath([]);
    };
  }, [historyPath, map, maps.Polyline, movingLine, paths]);

  useEffect(() => {
    map.addListener('idle', () => {
      mapBounds.current = map.getBounds();
    });
  }, [map]);

  function animateCar(newSpeed: SpeedEnum) {
    if (intervalId.current) {
      window.clearInterval(intervalId.current);
    }
    let panCount = 0;
    intervalId.current = window.setInterval(() => {
      const icons = movingLine.get('icons');
      icons[0].offset = (100 * countRef.current) / steps + '%';
      movingLine.set('icons', icons);
      countRef.current = (countRef.current + 1) % steps;

      //Check this point is inside map bound
      if (!mapBounds.current.contains(paths[countRef.current])) {
        panCount = panCount + 1;
      } else {
        panCount = 0;
      }
      if (panCount === 1) {
        map.panTo(paths[countRef.current]);
      }
      //end check inside map

      if (countRef.current === steps - 1) {
        icons[0].offset = '100%';
        movingLine.set('icons', icons);
        window.clearInterval(intervalId.current);
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
      countRef.current = vl;
      const icons = movingLine.get('icons');
      icons[0].offset = (100 * vl) / steps + '%';
      movingLine.set('icons', icons);
      setPercent(vl);
    },
    [movingLine, steps],
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
      <ProcessPath value={percent} steps={steps} onChange={onChangeValue} />
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
