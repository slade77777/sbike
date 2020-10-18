import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const ArticleIcon = ({color, size}: IconBodyType) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fill={color}
        d="M19.5 3.5a1 1 0 011 1v15a1 1 0 01-1 1h-15a1 1 0 01-1-1v-15a1 1 0 011-1h15zm.278-1.5H4.222C3 2 2 3 2 4.222v15.556C2 21 3 22 4.222 22h15.556C21 22 22 21 22 19.778V4.222C22 3 21 2 19.778 2z"
      />
      <Path
        fill={color}
        d="M14 16.25a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5a.75.75 0 01.75.75zm3-4a.75.75 0 01-.75.75h-8.5a.75.75 0 010-1.5h8.5a.75.75 0 01.75.75zm0-4a.75.75 0 01-.75.75h-8.5a.75.75 0 010-1.5h8.5a.75.75 0 01.75.75z"
      />
    </Svg>
  );
};
export default ArticleIcon;
