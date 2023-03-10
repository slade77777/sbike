import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {Button, message, Space} from 'antd';
import {LatLng} from 'shared-logic';
import styled from 'styled-components';
import GoogleMap from '../../../components/GoogleMap';
import {
  apiIsLoaded,
  initDrawingManager,
  polyOptions,
} from '../../../utils/googleMapUtils';

const defaultPosition = {
  lat: 21.027763,
  lng: 105.83416,
};

type Props = {
  initialData?: LatLng[];
  onSubmit?: (data: LatLng[]) => void;
  isSubmitting?: boolean;
};

const SafeZoneAlertMap: FC<Props> = ({isSubmitting, initialData, onSubmit}) => {
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

  const initialPolygon = useMemo(
    () =>
      state?.mapLoaded
        ? new state.maps.Polygon({
            paths: initialData,
            ...polyOptions,
          })
        : null,
    [initialData, state],
  );

  useEffect(() => {
    if (initialPolygon && !shape.current) {
      initialPolygon.setMap(state?.map);
      if (initialData && initialData.length > 0) {
        apiIsLoaded(state?.map, state?.maps, initialData || []);
      }
      setVisible(true);
    }
    if (drawingManager) {
      drawingManager.setDrawingMode(null);
    }
    return () => {
      if (initialPolygon) {
        initialPolygon.setMap(null);
      }
    };
  }, [drawingManager, initialData, initialPolygon, state]);

  useEffect(() => {
    if (state?.maps && drawingManager) {
      const {map, maps} = state;
      drawingManager.setMap(map);
      maps.event.addListener(drawingManager, 'overlaycomplete', function (
        e: any,
      ) {
        if (e.type != maps.drawing.OverlayType.MARKER) {
          // drawingManager.setDrawingMode(null);
          drawingManager.setOptions({
            drawingMode: null,
            drawingControl: false,
          });
          shape.current = e.overlay;
          setVisible(true);
        }
      });
    }
    return () => {
      if (drawingManager) {
        drawingManager.setMap(null);
      }
    };
  }, [drawingManager, state]);

  function deleteAllShape() {
    if (initialPolygon) {
      initialPolygon.setMap(null);
      drawingManager.setDrawingMode(null);
    }
    shape.current?.setMap(null);
    drawingManager.setOptions({
      drawingControl: true,
      drawingMode: state?.maps.drawing.OverlayType.POLYGON,
    });
    setVisible(false);
  }

  function handleSubmit() {
    if (shape.current) {
      const points = shape.current
        .getPath()
        .getArray()
        .map((p: any) => p.toJSON());
      onSubmit?.(points);
    } else {
      if (shape.current) {
        message.warn('B???n ch??a v??? v??ng an to??n');
      } else if (initialPolygon) {
        message.warn('H??y x??a h??nh c?? v?? t???o m???i v??ng an to??n');
      }
    }
  }

  return (
    <StyledGoogleMap>
      <StyledBtn>
        <Space direction="horizontal">
          <Button disabled={!visible} onClick={deleteAllShape}>
            X??a ??i v??? l???i
          </Button>
          <Button
            loading={isSubmitting}
            type="primary"
            onClick={handleSubmit}
            disabled={!visible}>
            Thi???t l???p v??ng an to??n
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

export default SafeZoneAlertMap;
