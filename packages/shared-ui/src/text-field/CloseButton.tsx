import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '../Icon/Icon';
import {Colors} from '../Colors';

type Props = {
  size?: number;
  onPress?: () => void | null;
};

const CloseButton: React.FC<Props> = ({onPress, size}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="closeOutline" color={Colors.ink300} size={size ?? 24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});

export default CloseButton;
