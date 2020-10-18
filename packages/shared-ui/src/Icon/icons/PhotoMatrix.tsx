import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const PhotoMatrix = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 22 26" fill={'none'}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={color}
      d="M20.333 25.3333C21.0694 25.3333 21.6663 24.7364 21.6663 24V1.33333C21.6663 0.596954 21.0694 0 20.333 0H1.66634C0.929962 0 0.333008 0.596954 0.333008 1.33333V24C0.333008 24.7364 0.929961 25.3333 1.66634 25.3333H20.333ZM2.99967 2.66667V14.6667H9.66634V2.66667H2.99967ZM9.66634 17.3333V22.6667H18.9997V17.3333H9.66634ZM6.99967 22.6667V17.3333H2.99967V22.6667H6.99967ZM18.9997 14.6667H12.333V2.66667H18.9997V14.6667Z"
    />
  </Svg>
);

export default PhotoMatrix;
