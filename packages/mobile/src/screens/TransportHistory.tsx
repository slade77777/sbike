import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  PanResponder,
  Platform,
  Text,
} from 'react-native';
import MapView, {
  Polyline,
  PROVIDER_GOOGLE,
  AnimatedRegion,
  Animated,
} from 'react-native-maps';
import {useRoute} from '@react-navigation/native';
import color from '../config/color';
import {Svg, Circle} from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
// @ts-ignore
import _ from 'lodash';
import {useDeviceId} from 'shared-logic/src';
import dayjs from "dayjs";

const {width} = Dimensions.get('window');

type Props = {};

type Coordinate = {
  latitude: number;
  longitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
};

const TransportHistory: React.FC<Props> = () => {
  const route = useRoute<any>();
  const dataPos = route?.params?.data;
  const deviceId = route?.params?.deviceId;
  const {data} = useDeviceId(deviceId);
  const deviceData = data?.data;
  const [time, setTime] = useState(0);
  const [mapLocation, setMapLocation] = useState({
    latitude: 0,
    longitude: 0,
    longitudeDelta: 0.05,
    latitudeDelta: 0.05,
  });

  useEffect(() => {
    setTimeout(() => {
      setMapLocation({
        latitude: dataPos[0].latitude,
        longitude: dataPos[0].longitude,
        longitudeDelta: 0.05,
        latitudeDelta: 0.05,
      });
    }, 500);
  }, []);

  const [isPlaying, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const marker = useRef();
  const speedOpt = [1, 2, 4];

  const rulerResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => setPosition(evt),
    onPanResponderMove: (evt) => setPosition(evt),
    onPanResponderRelease: (evt) => setPosition(evt),
  });

  const setPosition = (evt: any) => {
    setPlaying(false);
    const time = evt.nativeEvent.locationX;
    if (time >= 0 && time <= width - 100) {
      const pos = Math.round((dataPos.length * time) / (width - 100));
      setTimeout(() => {
        dataPos[pos] && setTime(pos);
      }, 500);
    }
  };

  const getBoundingBox = (region: Coordinate) => [
    region.longitude - region.longitudeDelta / 2, // westLng - min lng
    region.latitude - region.latitudeDelta / 2, // southLat - min lat
    region.longitude + region.longitudeDelta / 2, // eastLng - max lng
    region.latitude + region.latitudeDelta / 2, // northLat - max lat
  ];

  useEffect(() => {
    if (isPlaying && time < dataPos.length - 1) {
      if (Platform.OS === 'android') {
        if (marker) {
          marker?.current?.animateMarkerToCoordinate(
            {
              latitude: dataPos[time].latitude,
              longitude: dataPos[time].longitude,
            },
            speed,
          );
        }
      }
      setTimeout(() => {
        setTime(time + 1);
        const mapLimit = getBoundingBox(mapLocation);
        if (
          dataPos[time].latitude > mapLimit[3] ||
          dataPos[time].latitude < mapLimit[1] ||
          dataPos[time].longitude > mapLimit[2] ||
          dataPos[time].longitude < mapLimit[0]
        ) {
          setMapLocation({
            ...mapLocation,
            latitude: dataPos[time].latitude,
            longitude: dataPos[time].longitude,
          });
        }
      }, speed);
    }
  }, [time]);

  const handlePlay = () => {
    if (isPlaying) {
      setPlaying(false);
    } else {
      setPlaying(true);
      setTime(time + 1);
    }
  };

  const speedOptions = (index: number) => (
    <TouchableOpacity
      key={index}
      onPress={() => setSpeed(500 / index)}
      style={{
        width: 50,
        height: 50,
        backgroundColor: 'white',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderColor: speed === 500 / index ? 'black' : 'white',
        borderWidth: 1,
      }}>
      <Text style={{color: 'black', fontWeight: 'bold'}}>X{index}</Text>
    </TouchableOpacity>
  );

  const debouncedSetLocation = useCallback(
    _.debounce((coordinate: Coordinate) => {
      setMapLocation(coordinate);
    }, 200),
    [],
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Animated
        style={StyleSheet.absoluteFillObject}
        zoomEnabled={true}
        provider={PROVIDER_GOOGLE}
        onRegionChange={(coordinate: Coordinate) =>
          debouncedSetLocation(coordinate)
        }
        region={new AnimatedRegion(mapLocation)}>
        <MapView.Marker.Animated
          ref={marker}
          // rotation={dataPos[time].direction - 45}
          coordinate={{
            latitude: dataPos[time].latitude,
            longitude: dataPos[time].longitude,
          }}>
          {/*<EntyIcon name="direction" color={color.yellow} size={15} />*/}
          <Icon name="car" color={color.yellow} size={15} />
        </MapView.Marker.Animated>
        <Polyline
          coordinates={dataPos}
          strokeWidth={4}
          strokeColor={color.blue}
        />
      </Animated>
      <TouchableOpacity
        onPress={() => handlePlay()}
        style={{
          position: 'absolute',
          bottom: 40,
          left: 20,
          zIndex: 1,
          backgroundColor: 'white',
          borderRadius: 15,
        }}>
        <Icon
          name={isPlaying ? 'pausecircle' : 'play'}
          color={'black'}
          size={30}
        />
      </TouchableOpacity>
      <View
        style={{
          width: width - 90,
          height: 10,
          position: 'absolute',
          backgroundColor: 'white',
          bottom: 50,
          left: 65,
          zIndex: 0,
        }}>
        <View
          {...rulerResponder.panHandlers}
          style={{
            width: width - 90,
            height: 70,
            position: 'absolute',
            top: -30,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Svg height="50" width={width - 70} viewBox="0 0 300 12">
            <Circle
              cx={(time * (width - 70)) / dataPos.length}
              cy={5}
              r="10"
              fill={color.blue}
            />
          </Svg>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 230,
          borderRadius: 10,
          marginLeft: 10,
          marginTop: 10,
          padding: 5,
          justifyContent: 'center',
          opacity: 0.7,
          borderWidth: 0.5,
          backgroundColor: 'green'
        }}>
        <Text style={styles.detail}>{deviceData ? deviceData.carNumber : ''} {dayjs(dataPos[time].deviceTime).format('h:mm:s D/M/YYYY')}</Text>
        <Text style={styles.detail}>Toạ độ: {dataPos[time].latitude}, {dataPos[time].longitude}</Text>
        <Text style={styles.detail}>Điện áp ắc quy: {dataPos[time].batteryVoltage/1000}V</Text>
        <Text style={styles.detail}>Động cơ: {(dataPos[time].status & 1) > 0 ? 'Bật' : 'Tắt'}</Text>
      </View>
      <View style={{position: 'absolute', right: 20, bottom: 100, width: 50}}>
        {speedOpt.map((item) => {
          return speedOptions(item);
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    color: 'white',
    textShadowColor: 'red',
  }
});
export default TransportHistory;
