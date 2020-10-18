import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const BackAndroidIcon = ({color, size}: IconBodyType) => (
  <Svg height={size} viewBox="0 0 48 48" width={size} fill="none">
    <Path d="M0 0h48v48h-48z" fill="none" />
    <Path
      d="M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z"
      fill={color}
    />
  </Svg>
);

export default BackAndroidIcon;
