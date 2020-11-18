import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useRoute} from '@react-navigation/native';
import useDeviceId from 'shared-logic/src/hooks/useDeviceId';
import dayjs from 'dayjs';
import color from '../config/color';

type Props = {};

const DeviceInformation: React.FC<Props> = ({}) => {
  const route = useRoute<any>();
  const deviceId = route?.params?.deviceId;
  const {data} = useDeviceId(deviceId);
  const deviceInfo = data?.data || {};

  if (!data) {
    return <View style={{flex: 1, backgroundColor: 'c7c7cc'}} />;
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#c7c7cc'}}>
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
              ? dayjs(deviceInfo.expriedDate).format('DD/M/YYYY')
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
          <Text style={style.value}>{deviceInfo?.position?.status || ''}</Text>
        </View>
        <View style={style.row}>
          <Text style={style.label}>Cập nhật lúc</Text>
          <Text style={style.value}>
            {deviceInfo?.position?.deviceTime
              ? dayjs(deviceInfo?.position?.deviceTime).format(
                  'HH:ss DD/M/YYYY',
                )
              : ''}
          </Text>
        </View>
        <View style={style.row}>
          <Text style={style.label}>Động cơ</Text>
          <Text style={style.value}>{deviceInfo.carNumber}</Text>
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
});

export default DeviceInformation;
