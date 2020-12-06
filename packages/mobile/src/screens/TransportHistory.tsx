import React, {useEffect, useCallback, useRef, useReducer, useState, useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  Dimensions,
  PanResponder,
  Platform,
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {useRoute} from '@react-navigation/native';
import color from "../config/color";
import {Svg, Circle} from "react-native-svg";
import Icon from "react-native-vector-icons/AntDesign";

const {width, height} = Dimensions.get('window');

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
  const [isPlaying, setPlaying] = useState(false);

  const rulerResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gs) => true,
    onMoveShouldSetPanResponder: (evt, gs) => true,
    onPanResponderGrant: (evt) => setPosition(evt),
    onPanResponderMove: (evt) => setPosition(evt),
    onPanResponderRelease: (evt) => setPosition(evt)
  });

  const setPosition = (evt: any) => {
    setPlaying(false);
    const time = evt.nativeEvent.locationX;
    if (time >= 0 && time <= width - 100) {
      const pos = Math.round(data.length * time/(width - 100));
      setTimeout(() => {
        data[pos] && setTime(pos);
      }, 500)
    }
  }

  useEffect(() => {
    if (isPlaying && time < data.length - 1) {
      setTimeout(() => {
        setTime(time + 1);
      }, 500)
    }
  }, [time])

  const handlePlay = () => {
    if (isPlaying) {
      setPlaying(false);
    } else {
      setPlaying(true);
      setTime(time + 1)
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        zoomEnabled={true}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: data[time].latitude,
          longitude: data[time].longitude,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{
          latitude: data[time].latitude,
          longitude: data[time].longitude
        }}>
          <Icon name="car" color={color.yellow} size={25} />
        </Marker>
        <Polyline
          coordinates={data}
          strokeWidth={4}
          strokeColor={color.blue}
        />
      </MapView>
      <TouchableOpacity onPress={() => handlePlay()} style={{ position: 'absolute', bottom: 40, left: 20, zIndex: 1, backgroundColor: 'white', borderRadius: 15}}>
        <Icon name={isPlaying ? 'pausecircle' : 'play'} color={'black'} size={30} />
      </TouchableOpacity>
      <View style={{width: width - 70, height: 10, position: 'absolute', backgroundColor: 'white', bottom: 50, left: 45, zIndex: 0}}>
        <View {...rulerResponder.panHandlers}
              style={{ width: width - 70, height: 50, position: 'absolute', top: -20, left: 0, alignItems: 'center', justifyContent: 'center'}}>
          <Svg height="50" width={width - 70} viewBox="0 0 300 12">
            <Circle cx={time * (width - 110)/data.length} cy={5} r="10" fill={color.blue} />
          </Svg>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TransportHistory;
