import React from 'react';
import {View, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Colors} from './Colors';
import {M_500_12_20} from './typography/Typography';

type Props = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  count?: string | number;
};

const Badge: React.FC<Props> = ({style, textStyle, count}) => (
  <View style={[styles.container, style ?? {}]}>
    <M_500_12_20 style={[styles.text, textStyle ?? {}]}>{count}</M_500_12_20>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 20,
    minWidth: 20,
    borderRadius: 12,
    backgroundColor: Colors.primary400,
    paddingHorizontal: 4,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  text: {
    textAlign: 'center',
    color: Colors.white400,
  },
});

export default Badge;
