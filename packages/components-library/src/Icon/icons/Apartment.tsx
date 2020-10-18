import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconBodyType} from '../types';

const Apartment = (props: IconBodyType) => (
  <Svg width={props.size} height={props.size} viewBox="0 0 12 12" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.6667 10.6667H11.3333C11.7 10.6667 12 10.9667 12 11.3333C12 11.7 11.7 12 11.3333 12H10C9.63333 12 9.33333 11.7 9.33333 11.3333V2H7.33333V11.3333C7.33333 11.7 7.03333 12 6.66667 12H0.666667C0.3 12 0 11.7 0 11.3333C0 10.9667 0.3 10.6667 0.666667 10.6667H1.33333V0.666667C1.33333 0.3 1.63333 0 2 0H6.66667C7.03333 0 7.33333 0.3 7.33333 0.666667H10C10.3667 0.666667 10.6667 0.966667 10.6667 1.33333V10.6667ZM5.33333 6.66667C5.70152 6.66667 6 6.36819 6 6C6 5.63181 5.70152 5.33333 5.33333 5.33333C4.96514 5.33333 4.66667 5.63181 4.66667 6C4.66667 6.36819 4.96514 6.66667 5.33333 6.66667Z"
      fill={props.color}
      fill-opacity="0.5"
    />
  </Svg>
);

export default Apartment;
