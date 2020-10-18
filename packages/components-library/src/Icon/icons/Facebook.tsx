import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const Facebook = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={'none'}>
    <Path
      d="M21 3H3.75C3.33516 3 3 3.33516 3 3.75V21C3 21.4148 3.33516 21.75 3.75 21.75H21C21.4148 21.75 21.75 21.4148 21.75 21V3.75C21.75 3.33516 21.4148 3 21 3ZM18.8344 8.47266H17.3367C16.1625 8.47266 15.9352 9.03047 15.9352 9.85078V11.6578H18.7383L18.3727 14.4867H15.9352V21.75H13.0125V14.4891H10.568V11.6578H13.0125V9.57187C13.0125 7.15078 14.4914 5.83125 16.6523 5.83125C17.6883 5.83125 18.5766 5.90859 18.8367 5.94375V8.47266H18.8344Z"
      fill={color}
    />
  </Svg>
);

export default Facebook;
