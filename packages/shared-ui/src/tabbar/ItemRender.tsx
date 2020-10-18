import React from 'react';
import {
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../Colors';
import {M_500_16_24} from '../typography/Typography';

const ItemRender = (
  isSelected: boolean,
  data: ListRenderItemInfo<string>,
  onPress: (value: any) => void,
) => (
  <TouchableOpacity style={styles.container} onPress={() => onPress(data.item)}>
    <M_500_16_24
      style={[
        styles.title,
        {color: isSelected ? Colors.black500 : Colors.gray400},
      ]}>
      {data.item}
    </M_500_16_24>
    {isSelected && <View style={styles.checkView}></View>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  checkView: {
    backgroundColor: Colors.blue500,
    height: 3,
    width: 10,
    marginTop: 4,
  },
});

export default ItemRender;
