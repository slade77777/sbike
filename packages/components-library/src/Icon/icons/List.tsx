import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const ListIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 12 11" fill={'none'}>
    <Path
      d="M8.133 10.333H.667V8.754h7.466v1.58zm3.2-4.21H.667v-1.58h10.666v1.58zm0-4.21H.667V.332h10.666v1.58z"
      fill={color}
    />
  </Svg>
);

export default ListIcon;
