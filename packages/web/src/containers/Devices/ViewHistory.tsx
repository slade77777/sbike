import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
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

const STEPS = 1000;
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
  const [percent, setPercent] = useState(0);
  const [speed, setSpeed] = useState(SpeedEnum.NORMAL);

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
      movingLine.setPath([]);
    };
  }, [historyPath, map, maps.Polyline, movingLine, paths]);

  function animateCar(newSpeed: SpeedEnum) {
    if (intervalId.current) {
      window.clearInterval(intervalId.current);
    }
    if (!movingLine?.get('path')) {
      movingLine.setPath(paths);
    }
    intervalId.current = window.setInterval(() => {
      countRef.current = (countRef.current + 1) % STEPS;
      if (countRef.current >= STEPS - 1) {
        window.clearInterval(intervalId.current);
        setIsMoving(false);
      }
      const icons = movingLine.get('icons');
      icons[0].offset = (100 * countRef.current) / STEPS + '%';
      movingLine.set('icons', icons);
      setPercent((100 * countRef.current) / STEPS);
    }, DEFAULT_SPEED / newSpeed);
  }

  function stop() {
    window.clearInterval(intervalId.current);
    setIsMoving(false);
  }

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
      <ProcessPath percent={percent} />
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
