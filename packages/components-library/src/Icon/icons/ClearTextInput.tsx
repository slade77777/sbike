import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const ClearTextInputIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={'none'}>
    <Path
      fill={color}
      d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.21,11.79a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.41l-1.79,1.8a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.59,12l-1.8-1.79a1,1,0,0,1,1.42-1.42L12,10.59l1.79-1.8a1,1,0,0,1,1.42,1.42L13.41,12Z"
    />
  </Svg>
);

export default ClearTextInputIcon;
