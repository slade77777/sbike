import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconBodyType} from '../types';

const ArrowRightIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 19 19" fill="none">
    <Path
      d="M0 2a2 2 0 012-2h8.5a2 2 0 012 2v15a2 2 0 01-2 2H2a2 2 0 01-2-2V2z"
      fill={color}
    />
    <Path
      d="M6.5 10a2 2 0 012-2H17a2 2 0 012 2v7a2 2 0 01-2 2H8.5a2 2 0 01-2-2v-7z"
      fill={color}
    />
  </Svg>
);

export default ArrowRightIcon;
