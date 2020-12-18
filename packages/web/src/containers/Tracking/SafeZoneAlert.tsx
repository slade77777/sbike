import React, {useEffect, useMemo, useState} from 'react';
import {Button} from 'antd';
import styled from 'styled-components';
import GoogleMap from '../../components/GoogleMap';

const defaultPosition = {
  lat: 21.027763,
  lng: 105.83416,
};

const polyOptions = {
  fillColor: '#CD0000',
  strokeWeight: 0,
  fillOpacity: 0.45,
  editable: true,
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

  const [allOverlays, setAllOverlays] = useState<
    {overlay: {setMap: (vl: any) => void}}[]
  >([]);
  const [selectedShape, setSelectedShape] = useState<{
    setEditable: (vl: boolean) => boolean;
    setMap: (vl: any) => void;
  } | null>(null);

  const drawingManager = useMemo(
    () =>
      state?.maps
        ? new state.maps.drawing.DrawingManager({
            drawingMode: state.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
              position: state.maps.ControlPosition.TOP_CENTER,
              drawingModes: [state.maps.drawing.OverlayType.POLYGON],
            },
            polylineOptions: {
              editable: true,
            },
            rectangleOptions: polyOptions,
            circleOptions: polyOptions,
            polygonOptions: polyOptions,
          })
        : null,
    [state],
  );
  useEffect(() => {
    if (state?.maps && drawingManager) {
      const {map, maps} = state;
      drawingManager.setMap(map);
      maps.event.addListener(drawingManager, 'overlaycomplete', function (
        e: any,
      ) {
        allOverlays.push(e);
        if (e.type != maps.drawing.OverlayType.MARKER) {
          // Switch back to non-drawing mode after drawing a shape.
          drawingManager.setDrawingMode(null);

          // Add an event listener that selects the newly-drawn shape when the user
          // mouses down on it.
          const newShape = e.overlay;
          newShape.type = e.type;
          console.log(
            e.overlay
              .getPath()
              .getArray()
              .map((p: any) => p.toJSON()),
          );

          maps.event.addListener(newShape, 'click', function () {
            setSelection(newShape);
          });
          setSelection(newShape);
        }
      });
    }
    return () => {
      if (drawingManager) {
        drawingManager.setMap(null);
      }
    };
  }, [allOverlays, drawingManager, state]);

  function setSelection(shape: any) {
    clearSelection();
    setSelectedShape(shape);
    shape.setEditable(true);
    // selectColor(shape.get('fillColor') || shape.get('strokeColor'));
  }

  function clearSelection() {
    if (selectedShape) {
      selectedShape?.setEditable(false);
      setSelectedShape(null);
    }
  }

  function deleteSelectedShape() {
    if (selectedShape) {
      selectedShape.setMap(null);
    }
  }

  function deleteAllShape() {
    for (let i = 0; i < allOverlays.length; i++) {
      allOverlays[i].overlay.setMap(null);
    }
    setAllOverlays([]);
  }

  return (
    <StyledGoogleMap>
      <StyledBtn>
        <Button onClick={deleteSelectedShape}>Clear</Button>
        <Button onClick={deleteAllShape}>Clear all</Button>
      </StyledBtn>
      <GoogleMap
        defaultZoom={12}
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
