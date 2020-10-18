import * as React from 'react';
import {IconBodyType} from '../types';

const Event: React.FC<IconBodyType> = ({color, size}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M15.75 22.5a6 6 0 110-12 6 6 0 010 12zm0-10.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"
        fill={color}
      />
      <path
        d="M16.942 18.75L15 16.808V13.5h1.5v2.692l1.5 1.5-1.058 1.058z"
        fill={color}
      />
      <path
        d="M21 4.5A1.5 1.5 0 0019.5 3h-3V1.5H15V3H9V1.5H7.5V3h-3A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h3v-1.5h-3v-15h3V6H9V4.5h6V6h1.5V4.5h3V9H21V4.5z"
        fill={color}
      />
    </svg>
  );
};

export default Event;
