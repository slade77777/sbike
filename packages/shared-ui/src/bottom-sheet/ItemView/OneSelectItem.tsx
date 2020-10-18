import React from 'react';
import {StyleSheet, TouchableOpacity, ListRenderItemInfo} from 'react-native';
import {Colors} from '../../Colors';
import ArrowDown, {ArrowOrientation} from '../../text-field/ArrowDown';
import {M_500_16_20} from '../../typography/Typography';

type Props = {
  data: ListRenderItemInfo<string>;
  onPress: (value: any) => void;
};

const OneSelectItem = ({data, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(data.item)}>
      <M_500_16_20 style={styles.title}>{data.item}</M_500_16_20>
      <ArrowDown orientation={ArrowOrientation.right} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white400,
    height: 48,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: Colors.black500,
    flex: 7,
  },
});

export default OneSelectItem;
