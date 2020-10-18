import React from 'react';
import {Path, Circle, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const SearchIcon = ({color, size}: IconBodyType) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none">
      <Circle
        cx={6.786}
        cy={6.786}
        r={6.036}
        stroke={color}
        strokeWidth={1.5}
      />
      <Path stroke={color} strokeWidth={1.5} d="M10.54 10.48l9.001 9.355" />
    </Svg>
  );
};
export default SearchIcon;
