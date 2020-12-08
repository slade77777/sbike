import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  PanResponder,
  Platform,
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE, AnimatedRegion, Animated} from 'react-native-maps';
import {useRoute} from '@react-navigation/native';
import color from "../config/color";
import {Svg, Circle} from "react-native-svg";
import Icon from "react-native-vector-icons/AntDesign";

const {width, height} = Dimensions.get('window');

type Props = {};

const TransportHistory: React.FC<Props> = () => {
  const route = useRoute<any>();
  const data = route?.params?.data;
  const [time, setTime] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const marker = useRef();

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
        if (marker) {
          marker?.current?.animateMarkerToCoordinate(
            {
              latitude: data[time].latitude,
              longitude: data[time].longitude,
            },
            500
          );
        }
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
      <Animated
        style={StyleSheet.absoluteFillObject}
        zoomEnabled={true}
        provider={PROVIDER_GOOGLE}
        region={new AnimatedRegion({
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          longitudeDelta: 0.05,
          latitudeDelta: 0.05,
        })}
      >
        <MapView.Marker.Animated
          ref={marker}
          coordinate={{
            latitude: data[time].latitude,
            longitude: data[time].longitude
          }}
        >
          <Icon name="car" color={color.yellow} size={25} />
        </MapView.Marker.Animated>
        {/*<Marker coordinate={{*/}
        {/*  latitude: data[time].latitude,*/}
        {/*  longitude: data[time].longitude*/}
        {/*}}>*/}
        {/*  <Icon name="car" color={color.yellow} size={25} />*/}
        {/*</Marker>*/}
        <Polyline
          coordinates={data}
          strokeWidth={4}
          strokeColor={color.blue}
        />
      </Animated>
      <TouchableOpacity onPress={() => handlePlay()} style={{ position: 'absolute', bottom: 40, left: 20, zIndex: 1, backgroundColor: 'white', borderRadius: 15}}>
        <Icon name={isPlaying ? 'pausecircle' : 'play'} color={'black'} size={30} />
      </TouchableOpacity>
      <View style={{width: width - 70, height: 10, position: 'absolute', backgroundColor: 'white', bottom: 50, left: 45, zIndex: 0}}>
        <View {...rulerResponder.panHandlers}
              style={{ width: width - 70, height: 70, position: 'absolute', top: -30, left: 0, alignItems: 'center', justifyContent: 'center'}}>
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
