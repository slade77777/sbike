import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../Colors';

const ItemSeparator = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 0.5,
    backgroundColor: Colors.gray200,
    marginLeft: 16,
    marginRight: 16,
  },
});

export default ItemSeparator;
