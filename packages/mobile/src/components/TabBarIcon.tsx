import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, M_500_10_12} from 'components-library';

type Props = {
  title?: string;
  icon?: string;
  color?: string;
};

const TabBarIcon: React.FC<Props> = ({title, icon, color}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} color={color} />
      <M_500_10_12 style={[styles.title, {color: color}]}>{title}</M_500_10_12>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  title: {
    fontStyle: 'normal',
    marginTop: 4,
  },
});

export default TabBarIcon;
