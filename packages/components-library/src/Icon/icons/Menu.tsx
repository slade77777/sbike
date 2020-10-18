import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const MenuIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M2.75 5.25h18.5M2.75 11.25h18.5M2.75 17.25h18.5"
    />
  </Svg>
);

export default MenuIcon;
