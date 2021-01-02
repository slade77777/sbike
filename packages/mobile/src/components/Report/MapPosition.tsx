import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Report} from "shared-logic";
import Icon from "react-native-vector-icons/AntDesign";
import color from "../../config/color";
// @ts-ignore
import _ from 'lodash';

type Props = {
  positionInfo?: Report;
};

type Coordinate = {
  latitude: number;
  longitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
};

const MapPosition: React.FC<Props> = ({positionInfo}) => {
  const position = positionInfo?.position;
  const [mapLocation, setMapLocation] = useState({
    latitude: position?.latitude || 20,
    longitude: position?.longitude || 105,
    longitudeDelta: 0.02,
    latitudeDelta: 0.02,
  });

  useEffect(() => {
    position && position.longitude && position.latitude && debouncedSetLocation({
      latitude: position.latitude,
      longitude: position.longitude,
      longitudeDelta: 0.02,
      latitudeDelta: 0.02,
    })
  }, [position])

  const debouncedSetLocation = useCallback(
    _.debounce((coordinate: Coordinate) => {
      setMapLocation(coordinate);
    }, 200),
    [],
  );

  return (
    <View
      style={{
        flex: 1,
        height: 300,
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
      }}>
      {
        position && <View style={{position: 'absolute', zIndex: 2, left: 10, top: 10 }}>
          <Text style={{ color: 'red', borderWidth: 1, borderColor: 'white', borderRadius: 5}}>{`${position.latitude}-${position.longitude}`}</Text>
        </View>
      }
      {
        position && <MapView
          region={mapLocation}
          style={StyleSheet.absoluteFillObject}
          zoomEnabled={true}
          provider={PROVIDER_GOOGLE}
          onRegionChange={(coordinate: Coordinate) => {
            if (coordinate.latitudeDelta < 1 && coordinate.latitudeDelta < 1) {
              debouncedSetLocation(coordinate)
            }
          }}
        >
          <Marker
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude
            }}
          >
            <Icon name="car" color={color.yellow} size={25} />
          </Marker>
        </MapView>
      }
    </View>
  );
};

export default MapPosition;
