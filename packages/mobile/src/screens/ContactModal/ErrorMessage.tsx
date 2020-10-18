import React from 'react';
import {StyleSheet, View} from 'react-native';
import {L4, Colors} from 'shared-ui';

type Props = {
  children?: string;
};

const ErrorMessage: React.FC<Props> = ({children}) => (
  <View style={styles.container}>
    <L4 style={styles.error}>{children}</L4>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 15,
    alignItems: 'flex-end',
  },
  error: {
    color: Colors.red500,
  },
});

export default ErrorMessage;
