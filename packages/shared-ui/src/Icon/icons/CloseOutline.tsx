import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {IconBodyType} from '../types';

const CloseOutline = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={'none'}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.50006 8.49993C8.89205 8.10794 9.52769 8.10828 9.91927 8.50068L12.0001 10.5859L14.0808 8.5007C14.4724 8.10827 15.108 8.10793 15.5001 8.49993C15.892 8.89193 15.8917 9.52758 15.4993 9.91916L13.4142 12L15.4993 14.0808C15.8917 14.4723 15.892 15.108 15.5 15.5C15.108 15.892 14.4723 15.8916 14.0808 15.4992L12.0001 13.414L9.91925 15.4993C9.52766 15.8917 8.89201 15.892 8.50002 15.5C8.10803 15.108 8.10837 14.4723 8.50079 14.0808L10.5861 12L8.50082 9.91915C8.10841 9.52757 8.10807 8.89192 8.50006 8.49993Z"
      fill={color}
      fillOpacity="0.3"
    />
  </Svg>
);

export default CloseOutline;
