import React from 'react';
import {Colors, L3_Bold, L4} from 'components-library';
import {StyleSheet, View} from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
};

const ListHeader: React.FC<Props> = ({title, subtitle}) => {
  return (
    <View style={styles.container}>
      <L3_Bold>{title}</L3_Bold>
      <L4 style={styles.subtitle}>{subtitle}</L4>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    color: Colors.gray400,
    marginTop: 4,
  },
});

export default ListHeader;
