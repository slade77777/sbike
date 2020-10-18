import React from 'react';
import {Circle, Svg, Path} from 'react-native-svg';
import {IconBodyType} from '../types';

const ChatIcon = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={8} cy={12} r={1.5} fill={color} />
    <Circle cx={12} cy={12} r={1.5} fill={color} />
    <Circle cx={16} cy={12} r={1.5} fill={color} />
    <Path
      d="M3.899 17.962c.057-.211-.07-.504-.19-.715a2.167 2.167 0 00-.122-.183A9.606 9.606 0 012 11.776C1.983 6.379 6.458 2 11.992 2c4.826 0 8.854 3.343 9.796 7.781.14.658.212 1.33.212 2.002 0 5.405-4.302 9.853-9.836 9.853-.88 0-2.067-.222-2.715-.403a18.239 18.239 0 01-1.461-.486 1.494 1.494 0 00-1.116.017l-3.26 1.177a.77.77 0 01-.225.059.462.462 0 01-.432-.626l.944-3.412z"
      stroke={color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
  </Svg>
);

export default ChatIcon;
