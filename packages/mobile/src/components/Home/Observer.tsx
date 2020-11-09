import React, {useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import MapView from 'react-native-maps';
import {getCurrentDeviceLocation} from 'shared-logic';

type Props = {
};

const Observer: React.FC<Props> = ({}) => {

  useEffect(() => {
    getCurrentDeviceLocation().then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    })
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}} >
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  )
};

export default Observer;