import * as React from 'react';
import {Svg, Path} from 'react-native-svg';
import {IconBodyType} from '../types';

const Logo: React.FC<IconBodyType> = ({color, size = 24}) => {
  return (
    <Svg width={size} height={(31 / 24) * size} viewBox="0 0 24 31" fill="none">
      <Path
        d="M2 9.333l10-6.667 10 6.667m-20 0v13.333s0 6.667 10 6.667 10-6.666 10-6.666V9.332m-20 0L12 16l10-6.667"
        stroke={color}
        strokeWidth={3}
      />
    </Svg>
  );
};

export default Logo;
