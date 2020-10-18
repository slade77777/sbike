import React from 'react';
import {Svg, Path} from 'react-native-svg';
import {IconBodyType} from '../types';

const HomePlaceholder = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 46 42" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 37.5V18h3v19.5A1.5 1.5 0 009.5 39h27a1.5 1.5 0 001.5-1.5V18h3v19.5a4.5 4.5 0 01-4.5 4.5h-27A4.5 4.5 0 015 37.5zm33-33V15l-6-6V4.5A1.5 1.5 0 0133.5 3h3A1.5 1.5 0 0138 4.5z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.88 1.5a3 3 0 014.242 0l19.941 19.938a1.502 1.502 0 01-2.124 2.124L23.001 3.62 3.063 23.56A1.502 1.502 0 11.94 21.439L20.88 1.5z"
      fill={color}
    />
  </Svg>
);

export default HomePlaceholder;
