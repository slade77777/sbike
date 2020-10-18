import React from 'react';
import {StyleSheet, View} from 'react-native';

const ItemSeparator = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 20,
  },
});

export default ItemSeparator;
