import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const FiltersIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 13 14" fill={'none'}>
    <Path
      d="M1.333 2.694v-.027a1 1 0 011-1h8a1 1 0 011 1v.027A2 2 0 0110.848 4L8.152 7.125a2 2 0 00-.485 1.306v1.95a2 2 0 01-1.062 1.766l-.136.072A1 1 0 015 11.337V8.431a2 2 0 00-.486-1.306L1.82 4a2 2 0 01-.486-1.306z"
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
);

export default FiltersIcon;
