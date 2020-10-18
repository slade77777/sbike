import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconBodyType} from '../types';

const WarningIcon = ({color, size}: IconBodyType) => (
  <Svg height={size} viewBox="0 0 24 24" width={size}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path fill={color} d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </Svg>
);

export default WarningIcon;
