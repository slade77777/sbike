import React from 'react';
import Svg, {Path, Mask, Rect, G} from 'react-native-svg';
import {IconBodyType} from '../types';

const ArrowLeftIcon = (props: IconBodyType) => (
  <Svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none">
    <Mask id="mask0" mask-type="alpha" x="0" y="0" width="24" height="24">
      <Rect width="24" height="24" fill="#302E57" />
    </Mask>
    <G mask="url(#mask0)"></G>
    <Path d="M15 18L9 12L15 6" stroke={props.color} strokeWidth="1.5" />
  </Svg>
);

export default ArrowLeftIcon;
