import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const MapFillIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11.9684 2C7.60474 2 4 5.54371 4 9.91007C4.00542 11.8504 4.72599 13.7206 6.02372 15.1624C7.09881 16.428 9.37549 18.8959 10.5138 20.0982C11.6522 21.3006 12.3478 21.3006 13.4862 20.0982C14.6245 18.8959 16.9012 16.428 17.9763 15.1624C19.1779 13.7702 20 11.8718 20 9.91007C19.9164 5.52729 16.3492 2.01405 11.9684 2Z"
      fillRule="evenodd"
      fill={color}
    />
    <circle cx="12" cy="9" r="3" fill="white" />
  </Svg>
);

export default MapFillIcon;
