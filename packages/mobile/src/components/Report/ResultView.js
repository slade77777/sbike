import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={{}}>{item.time}</Text>
    <Text style={{}}>{item.action}</Text>
  </View>
);

export const ResultView = (props) => {
  const renderItem = ({ item }) => (
    <Item item={item} />
  );
  
  return (
    <View style= {styles.container}>
      <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: 'lemonchiffon'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});