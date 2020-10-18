import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const LoanIcon = ({color, size}: IconBodyType) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 6.5h8V8h-8V6.5zM14 14.5h8V16h-8v-1.5zM14 19.5h8V21h-8v-1.5z"
        fill={color}
      />
      <Path
        stroke={color}
        strokeWidth={1.5}
        d="M5.75 3.25v8M10 7.25H2M8.652 14.994l-5.657 5.657M8.828 20.828l-5.657-5.657"
      />
    </Svg>
  );
};
export default LoanIcon;
