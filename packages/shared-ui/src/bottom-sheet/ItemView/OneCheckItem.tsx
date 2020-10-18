import React from 'react';
import {StyleSheet, TouchableOpacity, ListRenderItemInfo} from 'react-native';
import {Colors} from '../../Colors';
import Icon from '../../Icon/Icon';
import {M_500_16_20} from '../../typography/Typography';

type Props = {
  dataSelected?: any;
  data: ListRenderItemInfo<any>;
  onPress: (value: any) => void;
};

const OneCheckItem = ({dataSelected, data, onPress}: Props) => {
  const isSelected = data.item === dataSelected;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(data.item)}>
      <M_500_16_20
        style={[
          styles.title,
          {color: isSelected ? Colors.blue500 : Colors.black500},
        ]}>
        {data.item}
      </M_500_16_20>
      {isSelected && (
        <Icon
          name="checkSelection"
          color={Colors.blue500}
          size={16}
          style={styles.checkView}
        />
      )}
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
  },
  checkView: {
    width: 16,
    height: 16,
    marginRight: 16,
    marginLeft: 16,
  },
});

export default OneCheckItem;
