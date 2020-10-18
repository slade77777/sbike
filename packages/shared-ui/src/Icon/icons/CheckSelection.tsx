import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const CheckSelection = ({color, size}: IconBodyType) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 12" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.8538 12C5.2604 12 4.6864 11.7497 4.2767 11.3119L0.3667 7.13268C-0.1394 6.59178 -0.1191 5.73538 0.4119 5.21998C0.9428 4.70438 1.7836 4.72488 2.2896 5.26598L5.8485 9.06968L13.6972 0.433784C14.1955 -0.114516 15.0358 -0.147416 15.5741 0.360084C16.1124 0.867684 16.1447 1.72368 15.6465 2.27198L7.4519 11.2886C7.0451 11.7362 6.4683 11.9955 5.8694 11.9999C5.8642 11.9999 5.859 12 5.8538 12Z"
        fill={color}
      />
    </Svg>
  );
};
export default CheckSelection;
