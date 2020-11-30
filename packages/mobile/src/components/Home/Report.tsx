import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {default as Icon5} from 'react-native-vector-icons/FontAwesome5';
import {default as IconLine} from 'react-native-vector-icons/SimpleLineIcons';

export const Report = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Icon5 name="shipping-fast" color={'gold'} size={50} />
          <Text style={styles.text}>Cảnh báo di chuyển</Text>
        </View>
        <View style={styles.item}>
          <Icon5 name="power-off" color={'gold'} size={50} />
          <Text style={styles.text}>Bật/tắt máy</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.item}>
          <IconLine name="speedometer" color={'gold'} size={50} />
          <Text style={styles.text}>Quá tốc độ</Text>
        </View>
        <View style={styles.item}>
          <Icon5 name="map-marked-alt" color={'gold'} size={50} />
          <Text style={styles.text}>Ra/vào vùng an toàn</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'gainsboro',
    padding: 5,
  },
  row: {
    height: 150,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    marginTop: 5,
  },
});

export default Report;
