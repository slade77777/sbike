import React from 'react';
import {StyleSheet, TouchableOpacity, ListRenderItemInfo} from 'react-native';
import {R_Normal_16_20} from '../../typography/Typography';
import {Colors} from '../../Colors';
import MultiCheckIcon from './MultiCheckIcon';

type Props = {
  dataSelected?: any;
  data: ListRenderItemInfo<any>;
  onPress: (value: any) => void;
};

const isMatchData = (dataSelected: string[], value: string): boolean => {
  if (!dataSelected) {
    return false;
  }
  return dataSelected.filter((item: string) => item === value).length > 0;
};

const MultiSelectItem = ({dataSelected, data, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(data.item)}>
      <MultiCheckIcon select={isMatchData(dataSelected, data.item)} />
      <R_Normal_16_20 style={styles.title}>{data.item}</R_Normal_16_20>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white400,
    height: 48,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    paddingLeft: 14,
    paddingRight: 16,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'normal',
    color: Colors.black500,
  },
});

export default MultiSelectItem;
