import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import {SearchItem} from './SearchItem';
import {DateTimeSearchItem} from './DateTimeSearchItem';

export const SearchView = () => {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <DateTimeSearchItem title='Từ lúc'/>
          <DateTimeSearchItem title='Tới lúc'/>
        </View>
        <View style={styles.row}>
          <SearchItem title='Thiết bị' value='ABC343HU'/>
          <View style={styles.placeholder} />
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Text>Tìm kiếm</Text>
        </TouchableOpacity>

      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginVertical: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  placeholder: {width: 130},
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'slategray',
    height: 35,
    width: 150,
    borderRadius: 5
  }
});