import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useMutation, useQueryCache} from 'react-query';
import {AlertPolygon, updateDeviceInfo, useDeviceId} from 'shared-logic';
import MapView, {Marker, Polygon, PROVIDER_GOOGLE} from 'react-native-maps';
// @ts-ignore
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('window');

export const SettingSafeArea = () => {
  const route = useRoute<any>();
  const queryCache = useQueryCache();
  const deviceId = route?.params?.deviceId;
  const result = useDeviceId(deviceId).data;
  const deviceInfo = result?.data || {};
  const alertConfig = deviceInfo?.alertConfig || {};
  const [markers, setMarkers] = useState<Array<AlertPolygon>>([]);
  const [mapLocation, setMapLocation] = useState({
    latitude: 21.0278,
    longitude: 105.8342,
    longitudeDelta: 0.02,
    latitudeDelta: 0.02,
  });

  useEffect(() => {
    if (alertConfig.alertPolygon && alertConfig.alertPolygon.length > 0) {
      const polygon = alertConfig.alertPolygon;
      setMarkers(polygon);
      const totalLat = polygon.reduce(function (a, b) {
        return a + b.latitude;
      }, 0);
      const totalLong = polygon.reduce(function (a, b) {
        return a + b.longitude;
      }, 0);
      setMapLocation({
        ...mapLocation,
        latitude: totalLat / polygon.length,
        longitude: totalLong / polygon.length,
      });
    }
  }, []);

  const [mutate, {isLoading}] = useMutation(updateDeviceInfo, {
    onSuccess: () =>
      Alert.alert(
        'Thông báo',
        'Đã cập nhật',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: true},
      ),
    onError: () => alert('có lỗi xảy ra, vui lòng thử lại'),
    onSettled: () => {
      queryCache.invalidateQueries(['deviceId', deviceId]);
    },
  });

  const resetArea = () => {
    setMarkers([]);
  }

  const updateDevice = () => {
    let data = Object.assign(deviceInfo);
    data.alertConfig.alertPolygon = markers;
    mutate(data);
  };

  const onMapPress = (coordinate: AlertPolygon) => {
    setMarkers([...markers, {...coordinate}]);
  };

  const debouncedSetLocation = useCallback(
    _.debounce((coordinate: any) => {
      setMapLocation(coordinate);
    }, 200),
    [],
  );

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapLocation}
        onRegionChange={(coordinate) => debouncedSetLocation(coordinate)}
        onPress={(e) => onMapPress(e.nativeEvent.coordinate)}>
        {
          markers.length > 0 && <Polygon
            coordinates={markers}
            strokeColor="#000"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={1}
          />
        }
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker}>
            <Icon name="map-marker" color={'red'} size={15} />
          </Marker>
        ))}
      </MapView>
      <View
        style={{
          position: 'absolute',
          width: 300,
          left: (width - 300) / 2,
          bottom: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          opacity: 0.7
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => resetArea()}>
          <Text>Đặt lại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => !isLoading && updateDevice()}>
          <Text>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
