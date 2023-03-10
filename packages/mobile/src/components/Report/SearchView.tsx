import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SearchDevice} from './SearchDevice';
import {HistoryPicker} from '../History/HistoryPicker';
import dayjs from 'dayjs';
import {formatToSearch} from 'shared-logic/src';
import Icon from 'react-native-vector-icons/AntDesign';
import color from '../../config/color';

type Props = {
  onSearch: Function;
};

export const SearchView: FC<Props> = ({onSearch}) => {
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [deviceId, setDeviceId] = useState('');
  const [showSearch, setShowSearch] = useState(true);

  const handleSearch = () => {
    const start = dayjs(timeStart);
    const end = dayjs(timeEnd);
    if (deviceId) {
      if (start.isBefore(end)) {
        const range = formatToSearch([start, end]);
        onSearch(deviceId, range[0], range[1]);
      } else {
        alert('Thời điểm không hợp lệ');
      }
    } else {
      alert('chưa chọn thiết bị');
    }
  };

  if (!showSearch) {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => setShowSearch(true)} style={styles.collapse}>
        <Icon name={'upcircle'} size={25} color={'blue'} />
        <Text style={styles.textSearch}>Tra cứu</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={() => setShowSearch(false)} style={styles.collapse}>
        <Icon name={'downcircle'} size={25} color={'blue'} />
        <Text style={styles.textSearch}>Tra cứu</Text>
      </TouchableOpacity>
      <View style={{...styles.row, zIndex: 5}}>
        <Text style={styles.label}>Thiết bị</Text>
        <SearchDevice
          deviceChoice={deviceId}
          onPress={(id) => setDeviceId(id)}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Từ</Text>
        <HistoryPicker
          chooseDate={(date: Date) => setTimeStart(date)}
          dateChoice={new Date(timeStart)}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Đến</Text>
        <HistoryPicker
          chooseDate={(date: Date) => setTimeEnd(date)}
          dateChoice={new Date(timeEnd)}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleSearch()}
        style={styles.searchButton}>
        <Text>Tìm kiếm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    paddingHorizontal: 10,
    height: 70,
  },
  label: {
    fontSize: 16,
    color: 'black',
    lineHeight: 24,
  },
  placeholder: {width: 130},
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'slategray',
    height: 35,
    width: 150,
    borderRadius: 5,
    marginVertical: 15,
  },
  collapse: {
    flexDirection: 'row',
    backgroundColor: color.blue,
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
  },
  textSearch: {
    marginLeft: 15,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
    lineHeight: 20
  }
});
