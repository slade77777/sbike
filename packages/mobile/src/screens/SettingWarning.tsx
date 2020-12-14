import React from 'react';
import {ScrollView, View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useDeviceId} from "shared-logic";
import {useRoute} from "@react-navigation/native";
import {default as IconLine} from 'react-native-vector-icons/SimpleLineIcons';
import {default as Icon5} from 'react-native-vector-icons/FontAwesome5';
// @ts-ignore
import ToggleSwitch from 'toggle-switch-react-native';
import {useMutation, useQueryCache} from 'react-query';
import {updateDeviceInfo} from "shared-logic/src";

export const SettingWarning = () => {
  const route = useRoute<any>();
  const queryCache = useQueryCache();
  const deviceId = route?.params?.deviceId;
  const result = useDeviceId(deviceId).data;
  const deviceInfo = result?.data || {};
  const alertConfig = deviceInfo?.alertConfig || {};
  const [mutate, { status, data, error }] = useMutation(updateDeviceInfo, {
    onSuccess: () => {
      queryCache.invalidateQueries(['deviceId', deviceId])
    }
  });

  const updateDevice = (type: string, value: any) => {
    let data = Object.assign(deviceInfo);
    data.alertConfig[type] = value;
    mutate(data);
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.row}>
        <View style={styles.leftInfo}>
          <Icon5 name="power-off" color={'gold'} size={20} />
          <Text style={styles.label}>
            Cảnh báo tắt/bật
          </Text>
        </View>
        <ToggleSwitch
          isOn={alertConfig.alertEngine}
          onColor="green"
          offColor="red"
          label=""
          labelStyle={{ display: 'none' }}
          size="large"
          onToggle={(isOn: boolean) => console.log("changed to : ", isOn)}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.leftInfo}>
          <Icon5 name="shipping-fast" color={'gold'} size={20} />
          <Text style={styles.label}>
            Cảnh báo di chuyển
          </Text>
        </View>
        <ToggleSwitch
          isOn={alertConfig.alertMoving}
          onColor="green"
          offColor="red"
          label=""
          labelStyle={{ display: 'none' }}
          size="large"
          onToggle={(isOn: boolean) => console.log("changed to : ", isOn)}
        />
      </View>
      <TouchableOpacity style={styles.row}>
        <View style={styles.leftInfo}>
          <IconLine name="speedometer" color={'gold'} size={20} />
          <Text style={styles.label}>
            Cảnh báo quá tốc độ
          </Text>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 17}}>
          {alertConfig.alertSpeed}km/h
        </Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <View style={styles.leftInfo}>
          <Icon5 name="map-marked-alt" color={'gold'} size={20} />
          <Text style={styles.label}>
            Cảnh báo vùng an toàn
          </Text>
        </View>
        <Icon5 name="chevron-right" color={'black'} size={20} />
      </View>
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
    paddingHorizontal: 10
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10
  }
})