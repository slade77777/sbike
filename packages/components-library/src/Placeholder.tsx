import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from './Colors';
import Icon from './Icon/Icon';

type Props = {
  style?: any;
};

const Placeholder: React.FC<Props> = ({style}) => {
  return (
    <View style={[styles.container, style]}>
      <Icon name="home-placeholder" color={Colors.gray300} size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray100,
  },
});

export default Placeholder;
