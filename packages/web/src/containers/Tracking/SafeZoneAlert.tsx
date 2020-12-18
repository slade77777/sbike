import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button, Space} from 'antd';
import styled from 'styled-components';
import GoogleMap from '../../components/GoogleMap';
import {initDrawingManager} from '../../utils/googleMapUtils';

const defaultPosition = {
  lat: 21.027763,
  lng: 105.83416,
};

const SafeZoneAlert = () => {
  const [state, setState] = useState<{
    mapLoaded: boolean;
    map: any;
    maps: any;
  } | null>({
    mapLoaded: false,
    map: null,
    maps: null,
  });

  const [visible, setVisible] = useState(false);

  const shape = useRef<any>(null);

  const drawingManager = useMemo(() => initDrawingManager(state?.maps), [
    state,
  ]);

  useEffect(() => {
    if (state?.maps && drawingManager) {
      const {map, maps} = state;
      drawingManager.setMap(map);
      maps.event.addListener(drawingManager, 'overlaycomplete', function (
        e: any,
      ) {
        if (e.type != maps.drawing.OverlayType.MARKER) {
          drawingManager.setDrawingMode(null);
          drawingManager.setOptions({
            drawingControl: false,
          });
          shape.current = e.overlay;
          setVisible(true);
        }
      });
    }
    return () => {
      if (drawingManager) {
        drawingManager.setOptions({
          drawingControl: false,
        });
      }
    };
  }, [drawingManager, state]);

  function deleteAllShape() {
    shape.current?.setMap(null);
    drawingManager.setOptions({
      drawingControl: true,
      drawingMode: state?.maps.drawing.OverlayType.POLYGON,
    });
    setVisible(false);
  }

  function showData() {
    if (shape.current) {
      console.log(
        shape.current
          .getPath()
          .getArray()
          .map((p: any) => p.toJSON()),
      );
    }
  }

  return (
    <StyledGoogleMap>
      <StyledBtn>
        <Space direction="horizontal">
          <Button disabled={!visible} onClick={deleteAllShape}>
            Xóa đi vẽ lại
          </Button>
          <Button
            disabled={!visible && !shape.current}
            type="primary"
            onClick={showData}>
            Thiết lập vùng an toàn
          </Button>
        </Space>
      </StyledBtn>
      <GoogleMap
        defaultZoom={14}
        options={{
          disableDefaultUI: true,
          mapTypeId: 'roadmap',
        }}
        defaultCenter={defaultPosition}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) => {
          setState({
            map,
            maps,
            mapLoaded: true,
          });
        }}
      />
    </StyledGoogleMap>
  );
};

const StyledGoogleMap = styled.div`
  height: calc(100vh);
  position: relative;
`;

const StyledBtn = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 200;
`;

export default SafeZoneAlert;
