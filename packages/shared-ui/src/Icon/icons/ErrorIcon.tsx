import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconBodyType} from '../types';

const ErrorIcon = ({color, size}: IconBodyType) => (
  <Svg height={size} viewBox="0 0 24 24" width={size}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path
      fill={color}
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
    />
  </Svg>
);
export default ErrorIcon;
