import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Colors} from '../Colors';

type Props = {
  style?: any;
  selected: boolean;
  onTap?: () => void;
  disable?: boolean;
};

const RadioButton = ({style, selected, onTap, disable = false}: Props) => {
  const mainStyle = [
    styles.container,
    style,
    {borderColor: selected ? Colors.blue500 : Colors.gray300},
  ];
  return (
    <TouchableOpacity style={mainStyle} onPress={onTap} disabled={disable}>
      {selected && <View style={styles.selectedView} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedView: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Colors.blue500,
  },
});

export default RadioButton;
