import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import useDeviceCompany from 'shared-logic/src/hooks/useDeviceCompany';
import dayjs from 'dayjs';
import {Device} from 'shared-logic';
import {getDeviceById} from 'shared-logic';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
// @ts-ignore
import _ from 'lodash';
import Config from 'react-native-config';
import {PERMISSIONS, request} from 'react-native-permissions';
import color from '../../config/color';
import {useAuthState} from '../../context/auth-context';

const {width, height} = Dimensions.get('window');
function decode(t: any) {
  for (
    var n,
      o,
      u = 0,
      l = 0,
      r = 0,
      d = [],
      h = 0,
      i = 0,
      a = null,
      c = Math.pow(10, 5);
    u < t.length;

  ) {
    (a = null), (h = 0), (i = 0);

    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);

    (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);

    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);

    (o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c]);
  }
  return d.map(function (t) {
    return {latitude: t[0], longitude: t[1]};
  });
}

type Props = {};
type Coordinate = {
  latitude: number;
  longitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
};

const Observer: React.FC<Props> = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [allowPermission, setAllowPermission] = useState(false);
  const [deviceLocation, setDeviceLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [mapLocation, setMapLocation] = useState({
    latitude: 21.0278,
    longitude: 105.8342,
    longitudeDelta: 0.02,
    latitudeDelta: 0.02,
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [carDirection, setCarDirection] = useState([]);

  useEffect(() => {
    // @ts-ignore
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then((response) => {
        // @ts-ignore
        if (response === 'granted') {
          setAllowPermission(true);
          const interval = setInterval(() => {
            Geolocation.getCurrentPosition(
              (position) => {
                position.coords &&
                  setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
              },
              (error) => {
                console.log(error);
              },
              {
                enableHighAccuracy: false,
                timeout: 3000,
                maximumAge: 3600000,
              },
            );
          }, 10000);
          return () => clearInterval(interval);
        } else {
          setAllowPermission(false);
        }
      })
      .catch(() => {
        setAllowPermission(false);
      });
  }, []);

  const navigation = useNavigation();

  const {state} = useAuthState();
  const userInfo = state?.userData;
  const {data} = useDeviceCompany(userInfo?.companyID);
  const deviceData = data?.data;

  const redirectCarLocation = (deviceId: string) => {
    setModalVisible(false);
    getDeviceById('', deviceId)
      .then((data) => {
        const deviceInfo = data.data;
        const position = deviceInfo?.position;
        setDeviceLocation({
          latitude: position?.latitude || 21.0278,
          longitude: position?.longitude || 105.8342,
        });
        setMapLocation({
          ...mapLocation,
          latitude: position?.latitude || 21.0278,
          longitude: position?.longitude || 105.8342,
        });
      })
      .catch(() => {
        alert('không tìm thấy vị trí');
      });
  };

  const displayCurrentLocation = () => {
    setMapLocation({
      ...currentLocation,
      longitudeDelta: 0.1,
      latitudeDelta: 0.1,
    });
  };

  const debouncedSetLocation = useCallback(
    _.debounce((coordinate: Coordinate) => {
      setMapLocation(coordinate);
    }, 200),
    [],
  );

  const showDirectionToCar = () => {
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    const destination = `${deviceLocation.latitude},${deviceLocation.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${Config.GOOGLE_MAPS_KEY}&mode=driving`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.routes.length) {
          const data = responseJson.routes[0];
          const direction = decode(data.overview_polyline.points);
          // @ts-ignore
          Array.isArray(direction) && setCarDirection(direction);
          if (data.legs.length) {
            const distance = data.legs[0]?.distance?.value;
            const centerPoint = direction[Math.round(direction.length / 2)];
            if (distance) {
              const zoom = distance / 100000;
              setMapLocation({
                longitudeDelta: zoom,
                latitudeDelta: zoom,
                ...centerPoint,
              });
            }
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const renderItem = (item: Device) => (
    <View key={item.deviceID} style={styles.tableRow}>
      <TouchableOpacity
        onPress={() => item.deviceID && redirectCarLocation(item.deviceID)}
        style={styles.tableCol}>
        <Text style={styles.textTable}>{item.carNumber || ''}</Text>
      </TouchableOpacity>
      <View style={styles.tableCol}>
        <Text style={styles.textTable}>{item?.position?.speed || 0}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.textTable}>
          {item?.position?.deviceTime
            ? dayjs(item.position.deviceTime).format('HH:mm')
            : ''}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(false);
          navigation.navigate('DeviceInformation', {deviceId: item.deviceID});
        }}
        style={styles.tableCol}>
        <Icon name="align-justify" color={'black'} size={25} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        zoomEnabled={true}
        region={mapLocation}
        onRegionChange={(coordinate) => debouncedSetLocation(coordinate)}>
        {deviceLocation.latitude ? (
          <Marker coordinate={deviceLocation}>
            <Icon name="car" color={color.yellow} size={25} />
          </Marker>
        ) : (
          <View />
        )}
        {currentLocation.latitude ? (
          <Marker coordinate={currentLocation}>
            <Icon name="user" color={'red'} size={15} />
          </Marker>
        ) : (
          <View />
        )}
        {carDirection.length > 0 && (
          <Polyline
            coordinates={[
              currentLocation, // optional
              ...carDirection,
              deviceLocation,
            ]}
            strokeWidth={4}
          />
        )}
      </MapView>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{position: 'absolute', left: 10, top: 10}}>
        <View
          style={{
            width: 100,
            height: 30,
            borderWidth: 1,
            borderColor: color.blue,
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Chọn xe</Text>
        </View>
      </TouchableOpacity>
      {deviceLocation.latitude && allowPermission ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            bottom: 70,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: color.blue,
            padding: 10,
          }}
          onPress={showDirectionToCar}>
          <Icon name={'location-arrow'} size={24} color={color.blue} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {allowPermission && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
          }}
          onPress={displayCurrentLocation}>
          <Icon name={'user'} size={24} color={'black'} />
        </TouchableOpacity>
      )}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}>
              <Icon name="close" color={'black'} size={25} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 30,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Danh sách xe
            </Text>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Biển số</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>Vận tốc</Text>
                <Text>(Km/h)</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>Thời gian</Text>
                <Text>(HH:mm)</Text>
              </View>
              <View style={styles.tableCol}>
                <Icon name="align-justify" color={'black'} size={25} />
              </View>
            </View>
            <FlatList
              data={deviceData}
              renderItem={(item) => renderItem(item.item)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: width * 0.8,
    maxHeight: height * 0.7,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  tableRow: {
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    flexDirection: 'row',
  },
  tableCol: {
    width: (width * 0.8 - 31) / 4,
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    borderRightWidth: 1,
    borderRightColor: 'black',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTable: {
    textAlign: 'center',
  },
});

export default Observer;
