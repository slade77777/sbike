import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const MapIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill={'none'}>
    <Path
      d="M11.771 10.438l-2.828 2.829a1.332 1.332 0 01-1.885 0l-2.83-2.83a5.333 5.333 0 117.543 0v0z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 6.667a2 2 0 11-4 0 2 2 0 014 0v0z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MapIcon;
