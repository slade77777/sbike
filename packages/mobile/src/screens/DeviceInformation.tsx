import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDeviceId} from 'shared-logic';
import dayjs from 'dayjs';
import color from '../config/color';
// @ts-ignore
import ToggleSwitch from 'toggle-switch-react-native';
import {updateDeviceInfo} from "shared-logic/src";
import {useMutation, useQueryCache} from 'react-query';
// @ts-ignore
import Spinner from 'react-native-loading-spinner-overlay';

type Props = {};

const DeviceInformation: React.FC<Props> = ({}) => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const deviceId = route?.params?.deviceId;
  const {data} = useDeviceId(deviceId);
  const deviceInfo = data?.data || {};
  const queryCache = useQueryCache();

  const [mutate, { isLoading }] = useMutation(updateDeviceInfo, {
    onSettled: () => {
      queryCache.invalidateQueries(['deviceId', deviceId])
    }
  });

  const updateDevice = (type: string, value: any) => {
    let data = Object.assign(deviceInfo);
    data[type] = value;
    mutate(data);
  }

  if (!data) {
    return <View style={{flex: 1, backgroundColor: 'c7c7cc'}} />;
  }
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#c7c7cc'}}>
      <Spinner
        visible={isLoading}
        textContent={''}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginVertical: 10,
          height: 100,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('TransportHistoryFilter', {deviceId})} style={style.tool}>
          <Icon name={'road'} size={50} color={color.blue} />
          <Text>Lộ trình</Text>
        </TouchableOpacity>
        <View style={style.tool}>
          <ToggleSwitch
            isOn={deviceInfo.isSettingEngineOn}
            onColor="green"
            offColor="red"
            label=""
            labelStyle={{ display: 'none' }}
            size="large"
            onToggle={(isOn: boolean) => updateDevice('isSettingEngineOn', isOn)}
          />
          <Text style={{marginTop: 11}}>Tắt, bật máy</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SettingWarning', {deviceId})} style={style.tool}>
          <EntypoIcon name={'warning'} size={50} color={'black'} />
          <Text>Cảnh báo</Text>
        </TouchableOpacity>
      </View>
      <View style={style.wrapper}>
        <View style={style.row}>
          <Text style={style.label}>Biển số xe</Text>
          <Text style={style.value}>{deviceInfo.carNumber}</Text>
        </View>
        <View style={style.row}>
          <Text style={style.label}>IMEI</Text>
          <Text style={style.value}>{deviceInfo.deviceID}</Text>
        </View>
        <View style={style.row}>
          <Text style={style.label}>Loại thiết bị</Text>
          <Text style={style.value}>{deviceInfo.deviceType}</Text>
        </View>
        <View style={style.row}>
          <Text style={style.label}>Thời gian hết hạn</Text>
          <Text style={style.value}>
            {deviceInfo.expriedDate
              ? dayjs(deviceInfo.expriedDate).format('DD/MM/YYYY')
              : ''}
          </Text>
        </View>
        <View style={style.row}>
          <Text style={style.label}>Mã công ty</Text>
          <Text style={style.value}>{deviceInfo.companyID}</Text>
        </View>
      </View>
      <View style={style.wrapper}>
        <View style={style.row}>
          <Text style={style.label}>Trạng thái</Text>
          <Text style={style.value}>{deviceInfo?.position?.serverTime ? ((new Date().getTime() - new Date(deviceInfo.position.serverTime).getTime())/60000 < 30 ? 'Online' : 'Offline') : 'Offline'}</Text>
        </View>
        <View style={style.row}>
          <Text style={style.label}>Cập nhật lúc</Text>
          <Text style={style.value}>
            {deviceInfo?.position?.deviceTime
              ? dayjs(deviceInfo?.position?.deviceTime).format(
                  'HH:mm DD/MM/YYYY',
                )
              : ''}
          </Text>
        </View>
        <View style={style.row}>
          <Text style={style.label}>Động cơ</Text>
          <Text style={style.value}>{(deviceInfo?.position?.status && deviceInfo.position.status & 1) ? 'tắt' : 'bật'}</Text>
        </View>
        <View style={style.row}>
          <Text style={style.label}>Toạ độ</Text>
          <Text style={style.value}>
            {deviceInfo?.position?.latitude || ''},{' '}
            {deviceInfo?.position?.longitude || ''}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  wrapper: {
    borderColor: 'grey',
    backgroundColor: 'white',
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    paddingHorizontal: 10,
    height: 60,
  },
  label: {
    fontSize: 16,
    color: color.green,
    lineHeight: 24,
  },
  value: {
    fontSize: 14,
    lineHeight: 18,
    color: color.blue,
  },
  tool: {
    flexDirection: 'column',
    alignItems: 'center'
  },
});

export default DeviceInformation;
