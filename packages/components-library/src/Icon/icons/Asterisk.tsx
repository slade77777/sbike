import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const AsteriskIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
    <Path
      d="M3.56553 5.58435L0 4.52178L0.543093 2.73902L4.10862 4.06133L4.00236 -6.10352e-05H5.80874L5.69067 4.12036L9.19717 2.82166L9.74026 4.61623L6.1157 5.69061L8.45336 8.89014L6.98937 9.99994L4.79339 6.5997L2.66824 9.91729L1.19244 8.84291L3.56553 5.58435Z"
      fill={color}
    />
  </Svg>
);

export default AsteriskIcon;
