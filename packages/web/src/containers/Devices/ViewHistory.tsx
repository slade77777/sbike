import React, {FC, useEffect, useMemo, useRef} from 'react';
import {LatLng} from 'shared-logic';
import styled from 'styled-components';
import {PlayCircleFilled} from '@ant-design/icons';
import {Button, Progress} from 'antd';
import {
  createHistoryPath,
  createMovingLine,
  genIcons,
} from '../../utils/googleMapUtils';

type Props = {
  paths: Array<LatLng>;
  maps: any;
  map: any;
};

const ViewHistory: FC<Props> = ({paths, map, maps}) => {
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
      movingLine.setPath([]);
    };
  }, [historyPath, map, maps.Polyline, movingLine, paths]);

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
    <StyledController>
      <Button
        shape="circle"
        onClick={startPlayback}
        icon={<PlayCircleFilled style={{fontSize: 24}} />}
        type="link"
        size="small"
      />
      <Progress percent={60} status="active" size="small" />
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
