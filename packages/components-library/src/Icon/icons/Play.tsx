import React from 'react';
import {Path, Svg, Circle} from 'react-native-svg';
import {IconBodyType} from '../types';

const PlayIcon = ({color, size = 24}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Circle cx={size / 2} cy={size / 2} r="23" stroke={color} strokeWidth="2" />
    <Path d="M36 24L18 34.3923L18 13.6077L36 24Z" fill={color} />
  </Svg>
);

export default PlayIcon;
