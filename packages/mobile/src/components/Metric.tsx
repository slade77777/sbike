// TODO: this component can be shared

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, L4, L4_Bold} from 'components-library';

type Props = {
  amount: number | string;
  unit: string;
};

const Metric: React.FC<Props> = ({amount, unit}) => {
  return (
    <View style={styles.container}>
      <L4_Bold style={styles.amount}>{amount}</L4_Bold>
      <L4 style={styles.unit}>{unit}</L4>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 5,
  },
  amount: {
    color: Colors.gray500,
    marginRight: 5,
  },
  unit: {
    color: Colors.gray500,
  },
});

export default Metric;
