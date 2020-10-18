import React from 'react';
import {Path, Svg, Circle, Rect} from 'react-native-svg';
import {IconBodyType} from '../types';

const Question = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M6 6C6 6 6 4 8 4C8.70155 4 10 4.5 10 6C10 7.5 7.5 8 7.5 9.5"
      stroke={color}
      stroke-width="1.5"
    />
    <Circle
      cx="7.5"
      cy="11.5"
      r="0.5"
      fill={color}
      stroke={color}
      stroke-width="1.5"
    />
    <Rect
      x="0.75"
      y="0.75"
      width="14.5"
      height="14.5"
      rx="3.25"
      stroke={color}
      stroke-width="1.5"
    />
  </Svg>
);

export default Question;
