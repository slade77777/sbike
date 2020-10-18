import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const Woman = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 40 40" fill={'none'}>
    <Path
      d="M39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20C0.5 9.23045 9.23045 0.5 20 0.5C30.7696 0.5 39.5 9.23045 39.5 20Z"
      fill={color}
      stroke="#E6E7E9"
    />
  </Svg>
);

export default Woman;
