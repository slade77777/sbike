import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from './Icon/Icon';

type Props = {
  iconName?: string;
  style?: any;
  onPress?: () => void;
  color?: string;
  size?: number;
};

const IconButton = ({iconName, style, onPress, color, size}: Props) => (
  <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
    {iconName && <Icon name={iconName} size={size} color={color} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton;
