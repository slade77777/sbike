import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

type Props = {
  data: Array<any>
}

type Item = {
  time: string,
  action: string
}

export const ResultView: React.FC<Props> = ({data}) => {
  const renderItem = (item: Item) => (
    <View style={styles.item}>
      <Text style={{}}>{item.time}</Text>
      <Text style={{}}>{item.action}</Text>
    </View>
  );
  
  return (
    <View style= {styles.container}>
      <FlatList
      data={data}
      renderItem={(item) => renderItem(item.item)}
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