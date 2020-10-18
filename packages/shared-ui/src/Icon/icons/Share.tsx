import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const Share = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.3301 4.62447L13.5 3.89476V5V8.21692C11.7283 8.23602 10.341 8.36005 9.25896 8.61823C8.07157 8.90153 7.21125 9.35601 6.6196 10.0496C6.03065 10.7401 5.76025 11.6068 5.62924 12.6059C5.49999 13.5916 5.49999 14.7677 5.5 16.1142L5.5 16.1429V17.8599L6.42183 16.4113C7.41812 14.8457 8.1157 14.0242 8.88289 13.5623C9.63788 13.1078 10.5226 12.9642 12.006 12.9286H13.5V16.1429V17.3313L14.3496 16.5003L20.3496 10.6317L20.7351 10.2547L20.3301 9.89875L14.3301 4.62447Z"
      stroke={color}
      fillOpacity="1"
    />
  </Svg>
);

export default Share;
