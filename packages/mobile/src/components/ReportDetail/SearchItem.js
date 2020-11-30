import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const SearchItem = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          {props.title}
        </Text>
      </View>
      <View style={styles.value}>
        <Text style={styles.valueText}>
          {props.value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 40,
    width: 130,
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {marginRight: 5},
  titleText: {fontSize: 6, textAlign: 'center'},
  value: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 5,
    borderWidth: 1,
    width: 85
  },
  valueText: {fontSize: 8, padding: 5, textAlign: 'center'}
});
