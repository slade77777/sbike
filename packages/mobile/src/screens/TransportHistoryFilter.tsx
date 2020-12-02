import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import useDeviceId from 'shared-logic/src/hooks/useDeviceId';
import color from '../config/color';
import {HistoryPicker} from '../components/History/HistoryPicker';
import {formatToSearch, getHistory} from 'shared-logic/src';
import dayjs from "dayjs";

type Props = {};

const TransportHistoryFilter: React.FC<Props> = ({}) => {
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const route = useRoute<any>();
  const deviceId = route?.params?.deviceId;
  const {data} = useDeviceId(deviceId);
  const deviceInfo = data?.data || {};

  const handleNavigate = () => {
    const range = formatToSearch([dayjs(timeStart), dayjs(timeEnd)])
    getHistory({
      deviceID: deviceId,
      from: range[0],
      to: range[1],
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={style.wrapper}>
        <View style={style.row}>
          <Text style={style.label}>Biển số xe</Text>
          <Text style={style.value}>{deviceInfo.carNumber}</Text>
        </View>
        <View style={style.row}>
          <Text style={style.label}>Thời gian từ</Text>
          <HistoryPicker
            chooseDate={(date: Date) => setTimeStart(date)}
            dateChoice={timeStart}
          />
        </View>
        <View style={style.row}>
          <Text style={style.label}>Thời gian đến</Text>
          <HistoryPicker
            chooseDate={(date: Date) => setTimeEnd(date)}
            dateChoice={timeEnd}
          />
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity
          style={{
            width: 200,
            height: 60,
            borderRadius: 10,
            backgroundColor: color.blue,
            justifyContent: 'center',
          }} onPress={handleNavigate}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Đồng ý
          </Text>
        </TouchableOpacity>
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
    height: 80,
  },
  label: {
    fontSize: 16,
    color: 'black',
    lineHeight: 24,
  },
  value: {
    fontSize: 14,
    lineHeight: 18,
    color: color.blue,
  },
});

export default TransportHistoryFilter;
