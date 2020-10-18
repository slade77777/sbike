import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const ProfileIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.9853 19.1912C19.4728 16.1323 17.2307 13.65 14.3 12.7852C14.0277 12.7051 13.9797 12.3207 14.2199 12.1766C15.6132 11.3438 16.5261 9.75832 16.3659 7.98065C16.1737 5.85065 14.4121 4.13704 12.2821 4.00892C9.7357 3.84877 7.6057 5.86666 7.6057 8.38103C7.6057 9.98253 8.47051 11.3919 9.76773 12.1606C10.024 12.3047 9.97593 12.6891 9.70367 12.7691C6.77292 13.634 4.53081 16.1163 4.01833 19.1752C3.89021 19.8798 4.45073 20.5364 5.17141 20.5364H18.8322C19.5529 20.5525 20.0974 19.8958 19.9853 19.1912Z"
      fill={color}
      fillOpacity="1"
    />
  </Svg>
);

export default ProfileIcon;
