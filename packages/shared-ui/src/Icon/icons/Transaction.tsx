import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const TransactionIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.587 7.804a9.239 9.239 0 00-17.28.336"
      stroke={color}
      strokeLinecap="round"
      strokeWidth={1.5}
    />

    <Path
      fill={color}
      d="M21.848 10.012a.3.3 0 01-.468.203l-2.81-1.953a.3.3 0 01.052-.521l3.314-1.433a.3.3 0 01.416.32l-.504 3.384z"
    />

    <Path
      d="M3.675 15.924a9.238 9.238 0 0017.258-.274"
      stroke={color}
      strokeLinecap="round"
      strokeWidth={1.5}
    />

    <Path
      fill={color}
      d="M2.414 13.716a.3.3 0 01.467-.202l2.811 1.952a.3.3 0 01-.052.522L2.326 17.42a.3.3 0 01-.416-.32l.504-3.385z"
    />
  </Svg>
);

export default TransactionIcon;
