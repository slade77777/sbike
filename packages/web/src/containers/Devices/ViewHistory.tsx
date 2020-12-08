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

const LIMITED_COUNT = 200;

const ViewHistory: FC<Props> = ({paths, map, maps}) => {
  const [playing, setPlaying] = useState(false);
  const intervalId = useRef(0);
  const iconsRef = useRef(genIcons(maps));
  const countRef = useRef(0);
  const [percent, setPercent] = useState(0);

  // const limitedCount = useMemo(() => paths.length || 1, [paths]);

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

  function startPlayback() {
    if (playing) {
      clearInterval(intervalId.current);
    } else {
      if (!movingLine?.get('path')) {
        movingLine.setPath(paths);
      }
      intervalId.current = setInterval(() => {
        countRef.current = (countRef.current + 1) % LIMITED_COUNT;
        if (countRef.current >= LIMITED_COUNT - 1) {
          clearInterval(intervalId.current);
          setPlaying(false);
        }
        const icons = movingLine.get('icons');
        icons[0].offset = countRef.current / 2 + '%';
        movingLine.set('icons', icons);
        setPercent((100 * countRef.current) / LIMITED_COUNT);
      }, 100);
    }
    setPlaying(!playing);
  }

  return (
    <StyledController>
      <Button
        shape="circle"
        onClick={startPlayback}
        icon={
          playing ? (
            <PauseCircleFilled style={{fontSize: 24}} />
          ) : (
            <PlayCircleFilled style={{fontSize: 24}} />
          )
        }
        type="link"
        size="small"
      />
      <ProcessPath percent={percent} />
    </StyledController>
  );
};

const StyledController = styled.div`
  position: absolute;
  border-radius: 2px;
  bottom: 50px;
  left: 50%;
  width: 40%;
  padding: 6px;
  background-color: rgba(255, 255, 255, 1);
  transform: translateX(-50%);
  z-index: 10;
  display: grid;
  grid-template-columns: 24px auto;
  align-items: center;
  grid-gap: 10px;
  box-shadow: 0 2px 8px #f0f1f2;
`;

export default ViewHistory;
