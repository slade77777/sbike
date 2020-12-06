import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import useDeviceId from 'shared-logic/src/hooks/useDeviceId';
import color from '../config/color';
import {HistoryPicker} from '../components/History/HistoryPicker';
import {
  formatToSearch,
  getHistory,
  getOneHourAgoRange,
  getThirtyMinutesAgoRange,
  getTodayRange,
  getYesterdayRange,
} from 'shared-logic/src';
import dayjs from 'dayjs';
// @ts-ignore
import ActionSheet from 'react-native-actionsheet';

type Props = {};

const dateRangeOptions = ['Hôm nay', 'Hôm qua', '1 giờ trước', '30 phút trước'];

const TransportHistoryFilter: React.FC<Props> = ({}) => {
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [dataRange, setDateRange] = useState('');
  const route = useRoute<any>();
  const deviceId = route?.params?.deviceId;
  const {data} = useDeviceId(deviceId);
  const deviceInfo = data?.data || {};
  const navigation = useNavigation();

  const handleNavigate = () => {
    const range = formatToSearch([dayjs(timeStart), dayjs(timeEnd)]);
    getHistory({
      deviceID: deviceId,
      from: range[0],
      to: range[1],
    })
      .then((res) => {
        const data = res.data;
        if (data.length > 0) {
          navigation.navigate('TransportHistory', {data});
        } else {
          alert('Không có dữ liệu');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showActionSheet = () => {
    // @ts-ignore
    actionSheet.show();
  };

  const handleChooseTime = (index: number) => {
    let dateRange = [dayjs(), dayjs()];
    switch (index) {
      case 0:
        setDateRange(dateRangeOptions[0]);
        dateRange = getTodayRange();
        break;
      case 1:
        setDateRange(dateRangeOptions[1]);
        dateRange = getYesterdayRange();
        break;
      case 2:
        setDateRange(dateRangeOptions[2]);
        dateRange = getOneHourAgoRange();
        break;
      case 3:
        setDateRange(dateRangeOptions[3]);
        dateRange = getThirtyMinutesAgoRange();
        break;
    }
    // @ts-ignore
    setTimeStart(dateRange[0]);
    // @ts-ignore
    setTimeEnd(dateRange[1]);
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={style.wrapper}>
        <View style={style.row}>
          <Text style={style.label}>Biển số xe</Text>
          <Text style={style.value}>{deviceInfo.carNumber}</Text>
        </View>
        <View style={style.row}>
          <Text style={style.label}>Thời gian</Text>
          <TouchableOpacity
            onPress={() => showActionSheet()}
            style={style.input}>
            <Text>{dataRange}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.row}>
          <Text style={style.label}>Từ</Text>
          <HistoryPicker
            chooseDate={(date: Date) => setTimeStart(date)}
            dateChoice={timeStart}
          />
        </View>
        <View style={style.row}>
          <Text style={style.label}>Đến</Text>
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
          }}
          onPress={handleNavigate}>
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
      <ActionSheet
        ref={(o) => (actionSheet = o)}
        title={'Chọn quãng thời gian'}
        options={dateRangeOptions}
        cancelButtonIndex={5}
        onPress={(index: number) => handleChooseTime(index)}
      />
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
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    height: 50,
    width: 150,
  },
});

export default TransportHistoryFilter;
