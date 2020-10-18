import React from 'react';
import {Svg, Path} from 'react-native-svg';
import {IconBodyType} from '../types';

const HomeIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.6797 11.4906L16.7684 8.59525L12.7693 4.59614C12.3373 4.16424 11.6495 4.16424 11.2176 4.59614L7.21849 8.59525L4.32314 11.4906C3.63529 12.1785 4.11519 13.3622 5.10696 13.3622H5.69883V19.1049C5.69883 20.0487 6.46666 20.8165 7.41045 20.8165H9.8739C10.1138 20.8165 10.3058 20.6246 10.3058 20.3846V18.721C10.3058 17.8092 11.0096 17.0094 11.9214 16.9774C12.8972 16.9294 13.713 17.7132 13.713 18.673V20.3846C13.713 20.6246 13.905 20.8165 14.1449 20.8165H16.6084C17.5522 20.8165 18.32 20.0487 18.32 19.1049V13.3782H18.9119C19.8717 13.3782 20.3676 12.1944 19.6797 11.4906Z"
      fill={color}
    />
  </Svg>
);

export default HomeIcon;