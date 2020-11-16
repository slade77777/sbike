import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import useDeviceCompany from 'shared-logic/src/hooks/useDeviceCompany';
import dayjs from 'dayjs';
import {Device} from 'shared-logic';
import {useAuthState} from '../../context/auth-context';
import color from '../../config/color';
import {getDeviceById} from 'shared-logic/src';

const {width, height} = Dimensions.get('window');

type Props = {};

const Observer: React.FC<Props> = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState({
    deviceLocation: {
      latitude: 21.0278,
      longitude: 105.8342,
    },
    mapLocation: {
      latitude: 21.0278,
      longitude: 105.8342,
    }
  });
  const {state} = useAuthState();
  const userInfo = state?.userData;
  const {data} = useDeviceCompany(userInfo?.companyID);
  const deviceData = data?.data;

  const redirectCarLocation = (deviceId: string) => {
    setModalVisible(false);
    getDeviceById(deviceId)
      .then((data) => {
        const deviceInfo = data.data;
        const position = deviceInfo?.position;
        setLocation({
          deviceLocation: {
            latitude: position?.latitude || 21.0278,
            longitude: position?.longitude || 105.8342,
          },
          mapLocation: {
            latitude: position?.latitude || 21.0278,
            longitude: position?.longitude || 105.8342,
          }
        });
      })
      .catch(() => {
        alert('không tìm thấy vị trí');
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
      <View style={styles.tableCol}>
        <Icon name="align-justify" color={'black'} size={25} />
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={{
          ...location.mapLocation,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
        onRegionChange={(coordinate) => {
          location.mapLocation.latitude = coordinate.latitude;
          location.mapLocation.longitude = coordinate.longitude;
        }}>
        <Marker coordinate={location.deviceLocation}>
          <Icon name="car" color={color.yellow} size={25} />
        </Marker>
      </MapView>
      <TouchableOpacity
        onPress={() => {
          setLocation({
            deviceLocation: location.deviceLocation,
            mapLocation: location.mapLocation
          });
          setModalVisible(true)
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
