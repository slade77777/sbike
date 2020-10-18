import React from 'react';
import {Colors} from 'shared-ui';
import {StyleSheet, View} from 'react-native';

const Divider: React.FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 15,
    borderBottomColor: Colors.gray300,
    borderBottomWidth: 1,
  },
});

export default Divider;
