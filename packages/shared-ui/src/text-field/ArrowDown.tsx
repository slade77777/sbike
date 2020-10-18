import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../Colors';
import Icon from '../Icon/Icon';

export enum ArrowOrientation {
  right = '0deg',
  bottom = '90deg',
}

type Props = {
  orientation: ArrowOrientation;
};

const ArrowDown = ({orientation}: Props) => {
  const rawAngle =
    orientation === ArrowOrientation.bottom
      ? ArrowOrientation.bottom.toString()
      : ArrowOrientation.right.toString();
  const additionalStyle = {transform: [{rotate: rawAngle}]};
  return (
    <Icon
      name="arrow-right"
      size={24}
      color={Colors.black200}
      style={[styles.icon, additionalStyle]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    flex: 1,
  },
});

export default ArrowDown;
