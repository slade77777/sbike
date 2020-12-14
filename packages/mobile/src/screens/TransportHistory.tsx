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
  const data = route?.params?.data;
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
        latitude: data[0].latitude,
        longitude: data[0].longitude,
        longitudeDelta: 0.05,
        latitudeDelta: 0.05,
      })
    }, 500)
  }, [])

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
      const pos = Math.round((data.length * time) / (width - 100));
      setTimeout(() => {
        data[pos] && setTime(pos);
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
    if (isPlaying && time < data.length - 1) {
      if (Platform.OS === 'android') {
        if (marker) {
          marker?.current?.animateMarkerToCoordinate(
            {
              latitude: data[time].latitude,
              longitude: data[time].longitude,
            },
            speed,
          );
        }
      }
      setTimeout(() => {
        setTime(time + 1);
        const mapLimit = getBoundingBox(mapLocation);
        if (
          data[time].latitude > mapLimit[3] ||
          data[time].latitude < mapLimit[1] ||
          data[time].longitude > mapLimit[2] ||
          data[time].longitude < mapLimit[0]
        ) {
          setMapLocation({
            ...mapLocation,
            latitude: data[time].latitude,
            longitude: data[time].longitude,
          })
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
        borderColor: speed === 500/index ? 'black' : 'white',
        borderWidth: 1
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
        onRegionChange={(coordinate: Coordinate) => debouncedSetLocation(coordinate)}
        region={new AnimatedRegion(mapLocation)}>
        <MapView.Marker.Animated
          ref={marker}
          style={{ transform: [{
            rotate: data[time].direction.toString() + 'deg'
          }]}}
          coordinate={{
            latitude: data[time].latitude,
            longitude: data[time].longitude,
          }}>
          <Icon name="car" color={color.yellow} size={25} />
        </MapView.Marker.Animated>
        <Polyline coordinates={data} strokeWidth={4} strokeColor={color.blue} />
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
          width: width - 70,
          height: 10,
          position: 'absolute',
          backgroundColor: 'white',
          bottom: 50,
          left: 45,
          zIndex: 0,
        }}>
        <View
          {...rulerResponder.panHandlers}
          style={{
            width: width - 70,
            height: 70,
            position: 'absolute',
            top: -30,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Svg height="50" width={width - 70} viewBox="0 0 300 12">
            <Circle
              cx={(time * (width - 110)) / data.length}
              cy={5}
              r="10"
              fill={color.blue}
            />
          </Svg>
        </View>
      </View>
      <View style={{position: 'absolute', right: 20, bottom: 100, width: 50}}>
        {speedOpt.map((item) => {
          return speedOptions(item);
        })}
      </View>
    </View>
  );
};

export default TransportHistory;
