import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useDeviceByCompany} from 'shared-logic';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Device} from 'shared-logic';
import {useNavigation} from '@react-navigation/native';
import color from '../../config/color';
import {useAuthState} from '../../context/auth-context';

type Props = {};

const Devices: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const {state} = useAuthState();
  const userInfo = state?.userData;
  const {data} = useDeviceByCompany(userInfo?.companyID);
  const deviceData = data?.data;

  const renderItem = (item: Device) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DeviceInformation', {deviceId: item.deviceID})
        }
        key={item.deviceID}
        style={{
          borderColor: 'grey',
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          height: 60,
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <View>
          <Text style={{fontSize: 14, fontWeight: 'bold', paddingBottom: 3}}>
            {item.carNumber}
          </Text>
          <Text style={{fontSize: 13}}>
            {item?.position?.deviceTime
              ? dayjs(item.position.deviceTime).format('HH:mm DD/M/YYYY')
              : ''}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginRight: 5, fontSize: 16, lineHeight: 24}}>
            {item.deviceID}
          </Text>
          <Icon name="chevron-right" color={color.yellow} size={25} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={deviceData}
        renderItem={(item) => renderItem(item?.item)}
        ListHeaderComponent={
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              lineHeight: 30,
              paddingVertical: 10,
              color: color.blue,
            }}>
            Danh sách thiết bị
          </Text>
        }
      />
    </View>
  );
};

export default Devices;
