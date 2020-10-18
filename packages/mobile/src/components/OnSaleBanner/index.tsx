import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, L3} from 'components-library';

type Props = {
  address: string;
  saleStatus: string;
  name: string;
};

const OnSaleBanner: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.indicator} />
      <Text style={styles.saleStatus}>{props.saleStatus}</Text>
      <Text style={styles.name}>{props.name}</Text>
      <L3 style={styles.address}>{props.address}</L3>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    position: 'relative',
    marginBottom: 24,
  },
  indicator: {
    position: 'absolute',
    backgroundColor: Colors.green400,
    width: 12,
    height: 12,
    borderRadius: 6,
    top: 14,
    left: 12,
  },
  saleStatus: {
    paddingLeft: 18,
    marginBottom: 6,
    color: Colors.green400,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 9,
  },
  address: {
    color: Colors.gray400,
  },
});

export default React.memo(OnSaleBanner);
