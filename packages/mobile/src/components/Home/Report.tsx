import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {default as Icon5} from 'react-native-vector-icons/FontAwesome5';
import {default as IconLine} from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import color from "../../config/color";

const Report: React.FC = () => {
  const navigation = useNavigation();

  const openMoveReport = () => navigation.navigate('MoveReport');
  const openOnOffReport = () => navigation.navigate('OnOffReport');
  const openSpeedReport = () => navigation.navigate('SpeedReport');
  const openAreaReport = () => navigation.navigate('AreaReport');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item} onPress={openMoveReport}>
          <Icon5 name="shipping-fast" color={color.blue} size={50} />
          <Text style={styles.text}>Di chuyển</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={openOnOffReport}>
          <Icon5 name="power-off" color={color.yellow} size={50} />
          <Text style={styles.text}>Bật/tắt máy</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item} onPress={openSpeedReport}>
          <IconLine name="speedometer" color={'gold'} size={50} />
          <Text style={styles.text}>Quá tốc độ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={openAreaReport}>
          <Icon5 name="map-marked-alt" color={'gold'} size={50} />
          <Text style={styles.text}>Ra/vào vùng an toàn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: color.green,
    padding: 5,
    height: '100%'
  },
  row: {
    height: 150,
    backgroundColor: color.green,
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
