import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconBodyType} from '../types';

const DoneIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM7.61899 12.8405C7.76722 12.9911 7.96802 13.075 8.1782 13.075C8.18369 13.075 8.1884 13.075 8.1939 13.0758C8.40957 13.0711 8.61349 12.9785 8.75856 12.8185L14.0995 6.93651C14.3904 6.61496 14.3669 6.11931 14.0461 5.82833C13.727 5.53815 13.2313 5.56089 12.9388 5.88165L8.15545 11.1496L5.84339 8.79994C5.53988 8.49093 5.04344 8.48781 4.73443 8.79053C4.42542 9.09483 4.4215 9.59048 4.72502 9.89949L7.61899 12.8405Z"
      fill={color}
    />
  </Svg>
);

export default DoneIcon;
