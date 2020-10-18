import React from 'react';
import {Svg, Path} from 'react-native-svg';
import {IconBodyType} from '../types';

const Dissatisfied = ({size, color}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.33301 8.0001C1.33301 4.31344 4.31301 1.33344 7.99301 1.33344C11.6797 1.33344 14.6663 4.31344 14.6663 8.0001C14.6663 11.6868 11.673 14.6668 7.99301 14.6668C4.31301 14.6668 1.33301 11.6868 1.33301 8.0001ZM5.56634 7.64677L5.91967 7.29344L6.27301 7.64677C6.46634 7.8401 6.78634 7.8401 6.97967 7.64677C7.17301 7.45343 7.17301 7.13344 6.97967 6.9401L6.62634 6.58677L6.97967 6.23344C7.17301 6.0401 7.17301 5.7201 6.97967 5.52677C6.78634 5.33343 6.46634 5.33343 6.27301 5.52677L5.91967 5.8801L5.56634 5.52677C5.37301 5.33343 5.05301 5.33343 4.85967 5.52677C4.66634 5.7201 4.66634 6.0401 4.85967 6.23344L5.21301 6.58677L4.85967 6.9401C4.66634 7.13344 4.66634 7.45343 4.85967 7.64677C5.05301 7.8401 5.37301 7.8401 5.56634 7.64677ZM7.99968 9.0001C6.64634 9.0001 5.46634 9.7401 4.83301 10.8334C4.70634 11.0534 4.87301 11.3334 5.12634 11.3334H10.873C11.1263 11.3334 11.293 11.0534 11.1663 10.8334C10.533 9.7401 9.35301 9.0001 7.99968 9.0001ZM7.99967 13.3334C5.05301 13.3334 2.66634 10.9468 2.66634 8.0001C2.66634 5.05343 5.05301 2.66677 7.99967 2.66677C10.9463 2.66677 13.333 5.05343 13.333 8.0001C13.333 10.9468 10.9463 13.3334 7.99967 13.3334ZM10.0797 5.8801L10.433 5.52677C10.6263 5.33343 10.9463 5.33343 11.1397 5.52677C11.333 5.7201 11.333 6.0401 11.1397 6.23344L10.7863 6.58677L11.1397 6.9401C11.333 7.13344 11.333 7.45343 11.1397 7.64677C10.9463 7.8401 10.6263 7.8401 10.433 7.64677L10.0797 7.29344L9.72634 7.64677C9.53301 7.8401 9.21301 7.8401 9.01967 7.64677C8.82634 7.45343 8.82634 7.13344 9.01967 6.9401L9.37301 6.58677L9.01967 6.23344C8.82634 6.0401 8.82634 5.7201 9.01967 5.52677C9.21301 5.33343 9.53301 5.33343 9.72634 5.52677L10.0797 5.8801Z"
      fill={color}
      fillOpacity="0.5"
    />
  </Svg>
);

export default Dissatisfied;