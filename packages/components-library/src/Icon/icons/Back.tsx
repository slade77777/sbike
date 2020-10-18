import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const BackIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 9 14" fill={'none'}>
    <Path d="M8 13L2 7l6-6" stroke={color} strokeWidth={1.5} />
  </Svg>
);

export default BackIcon;
