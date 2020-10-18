import React from 'react';
import Svg, {Path, Mask, Rect, G, Circle} from 'react-native-svg';
import {IconBodyType} from '../types';

const ArrowRightRound = (props: IconBodyType) => (
  <Svg width={props.size} height={props.size} viewBox="0 0 20 20" fill="none">
    <Circle
      r="9.75"
      transform="matrix(-1 0 0 1 10 10)"
      fill="white"
      stroke="#C7C7CC"
      stroke-width="0.5"
    />
    <Mask id="mask0" mask-type="alpha" x="4" y="4" width="12" height="12">
      <Rect
        width="12"
        height="12"
        transform="matrix(4.37114e-08 1 1 -4.37114e-08 4 4)"
        fill="#ffffff"
      />
    </Mask>
    <G mask="url(#mask0)">
      <Path d="M8.5 13L11.5 10L8.5 7" stroke="#2B2B2E" stroke-width="1.5" />
    </G>
  </Svg>
);

export default ArrowRightRound;
