import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const PhotoMatrix = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 22 26" fill={'none'}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={color}
      d="M1.66634 25.3333C0.929961 25.3333 0.333008 24.7364 0.333008 24V1.33333C0.333008 0.596954 0.929962 0 1.66634 0H20.333C21.0694 0 21.6663 0.596954 21.6663 1.33333V24C21.6663 24.7364 21.0694 25.3333 20.333 25.3333H1.66634ZM2.99967 14.6667V2.66667H18.9997V14.6667H2.99967ZM12.333 17.3333H9.66634V22.6667H12.333V17.3333ZM18.9997 17.3333H14.9997V22.6667H18.9997V17.3333ZM6.99967 17.3333V22.6667H2.99967V17.3333H6.99967Z"
    />
  </Svg>
);

export default PhotoMatrix;
