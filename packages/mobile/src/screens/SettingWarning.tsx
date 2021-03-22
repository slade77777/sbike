import React, {useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from 'react-native';
import {useDeviceId, updateDeviceInfo} from 'shared-logic';
import {useNavigation, useRoute} from '@react-navigation/native';
import {default as IconLine} from 'react-native-vector-icons/SimpleLineIcons';
import {default as Icon5} from 'react-native-vector-icons/FontAwesome5';
// @ts-ignore
import ToggleSwitch from 'toggle-switch-react-native';
// @ts-ignore
import Spinner from 'react-native-loading-spinner-overlay';
import {useMutation, useQueryCache} from 'react-query';
import Icon from 'react-native-vector-icons/FontAwesome';
import color from '../config/color';
const {width, height} = Dimensions.get('window');

export const SettingWarning = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [limitSpeed, setLimitSpeed] = useState('');
  const queryCache = useQueryCache();
  const deviceId = route?.params?.deviceId;
  const result = useDeviceId(deviceId).data;
  const deviceInfo = result?.data || {};
  const alertConfig = deviceInfo?.alertConfig || {};
  const [mutate, {isLoading}] = useMutation(updateDeviceInfo, {
    onSettled: () => {
      queryCache.invalidateQueries(['deviceId', deviceId]);
    },
  });

  const updateDevice = (type: string, value: any) => {
    let data = Object.assign(deviceInfo);
    data.alertConfig[type] = value;
    mutate(data);
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <Spinner visible={isLoading} textContent={''} />
      <View style={styles.row}>
        <View style={styles.leftInfo}>
          <Icon5 name="power-off" color={'gold'} size={20} />
          <Text style={styles.label}>Cảnh báo tắt/bật</Text>
        </View>
        <ToggleSwitch
          isOn={alertConfig.alertEngine}
          onColor="green"
          offColor="red"
          label=""
          labelStyle={{display: 'none'}}
          size="large"
          onToggle={(isOn: boolean) => updateDevice('alertEngine', isOn)}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.leftInfo}>
          <Icon5 name="shipping-fast" color={'gold'} size={20} />
          <Text style={styles.label}>Cảnh báo di chuyển</Text>
        </View>
        <ToggleSwitch
          isOn={alertConfig.alertMoving}
          onColor="green"
          offColor="red"
          label=""
          labelStyle={{display: 'none'}}
          size="large"
          onToggle={(isOn: boolean) => updateDevice('alertMoving', isOn)}
        />
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.row}>
        <View style={styles.leftInfo}>
          <IconLine name="speedometer" color={'gold'} size={20} />
          <Text style={styles.label}>Cảnh báo quá tốc độ</Text>
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 17}}>
          {alertConfig.alertSpeed}km/h
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SettingSafeArea', {deviceId})} style={styles.row}>
        <View style={styles.leftInfo}>
          <Icon5 name="map-marked-alt" color={'gold'} size={20} />
          <Text style={styles.label}>Cảnh báo vùng an toàn</Text>
        </View>
        <Icon5 name="chevron-right" color={'black'} size={20} />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                zIndex: 2
              }}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Icon name="close" color={'black'} size={25} />
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
              Nhập tốc độ giới hạn
            </Text>
            <Text style={{textAlign: 'center'}}>
              (giới hạn: 1 ~ 250km/h)
            </Text>
            <View
              style={{marginVertical: 20, width: '100%', alignItems: 'center'}}>
              <View style={styles.textInput}>
                <TextInput
                  placeholder={'km/h'}
                  placeholderTextColor={'grey'}
                  onChangeText={(val) => setLimitSpeed(val)}
                  keyboardType={'numeric'}
                  value={limitSpeed}
                  style={{
                    justifyContent: 'center',
                    fontSize: 16,
                    color: 'black',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (limitSpeed && 1 <= parseInt(limitSpeed) && parseInt(limitSpeed) <= 250) {
                    updateDevice('alertSpeed', limitSpeed);
                    setTimeout(() => {
                      setModalVisible(false);
                    }, 100);
                  } else {
                    alert('Giá trị không hợp lệ');
                  }
                }}
                style={{
                  marginTop: 20,
                  borderRadius: 5,
                  backgroundColor: color.blue,
                  height: 40,
                  width: 150,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 10,
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
  },
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
  textInput: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    width: width * 0.6,
  },
});
