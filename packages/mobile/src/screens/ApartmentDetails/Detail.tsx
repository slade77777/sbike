import {L3, L3_Bold} from 'components-library';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  name: string;
  amount: number | string;
};

const Detail: React.FC<Props> = ({name, amount}) => {
  return (
    <View style={styles.container}>
      <L3_Bold style={styles.amount}>{amount}</L3_Bold>
      <L3>{name}</L3>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
    marginRight: 8,
  },
  amount: {
    marginRight: 4,
  },
});

export default Detail;
