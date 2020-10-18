import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const GuestIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.7501 3.93997L4.07011 10.08C3.24011 10.43 3.26011 11.61 4.09011 11.93L9.43011 14C9.69011 14.1 9.90011 14.31 10.0001 14.57L12.0601 19.9C12.3801 20.74 13.5701 20.76 13.9201 19.93L20.0701 5.25997C20.4001 4.42997 19.5701 3.59997 18.7501 3.93997Z"
      fill={color}
      fillOpacity="1"
    />
  </Svg>
);

export default GuestIcon;
