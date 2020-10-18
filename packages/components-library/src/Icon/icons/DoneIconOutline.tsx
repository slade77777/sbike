import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconBodyType} from '../types';

const DoneIconOutline = ({color, size}: IconBodyType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.7109 15.6875C10.5078 15.8906 10.2656 15.9922 9.98438 15.9922C9.71875 15.9922 9.48438 15.8906 9.28125 15.6875L7.00781 13.3906C6.80469 13.2031 6.70312 12.9766 6.70312 12.7109C6.70312 12.4297 6.80469 12.1953 7.00781 12.0078C7.19531 11.8047 7.42188 11.7031 7.6875 11.7031C7.96875 11.7031 8.20312 11.8047 8.39062 12.0078L10.0078 13.6016L15.6094 8C15.7969 7.8125 16.0234 7.71875 16.2891 7.71875C16.5703 7.71875 16.8047 7.8125 16.9922 8C17.1953 8.1875 17.2969 8.42188 17.2969 8.70312C17.2969 8.96875 17.1953 9.20312 16.9922 9.40625L10.7109 15.6875ZM12 21.9922C10.625 21.9922 9.32812 21.7344 8.10938 21.2188C6.89062 20.6875 5.82812 19.9688 4.92188 19.0625C4.01562 18.1562 3.30469 17.1016 2.78906 15.8984C2.25781 14.6797 1.99219 13.3828 1.99219 12.0078C1.99219 10.6172 2.25781 9.32031 2.78906 8.11719C3.30469 6.89844 4.01562 5.83594 4.92188 4.92969C5.82812 4.02344 6.89062 3.3125 8.10938 2.79688C9.32812 2.26563 10.625 2 12 2C13.375 2 14.6719 2.26563 15.8906 2.79688C17.1094 3.3125 18.1719 4.02344 19.0781 4.92969C19.9844 5.83594 20.6953 6.89844 21.2109 8.11719C21.7422 9.32031 22.0078 10.6172 22.0078 12.0078C22.0078 13.3828 21.7422 14.6797 21.2109 15.8984C20.6953 17.1016 19.9844 18.1562 19.0781 19.0625C18.1719 19.9688 17.1094 20.6875 15.8906 21.2188C14.6719 21.7344 13.375 21.9922 12 21.9922ZM12 20C13.1094 20 14.1484 19.7891 15.1172 19.3672C16.0859 18.9453 16.9297 18.375 17.6484 17.6562C18.3828 16.9375 18.9609 16.0938 19.3828 15.125C19.7891 14.1406 19.9922 13.1016 19.9922 12.0078C19.9922 10.8984 19.7891 9.85938 19.3828 8.89062C18.9609 7.92187 18.3828 7.07812 17.6484 6.35938C16.9297 5.625 16.0859 5.04688 15.1172 4.625C14.1484 4.20312 13.1094 3.99219 12 3.99219C10.8906 3.99219 9.85156 4.20312 8.88281 4.625C7.91406 5.04688 7.0625 5.625 6.32812 6.35938C5.60938 7.07812 5.03906 7.92187 4.61719 8.89062C4.21094 9.85938 4.00781 10.8984 4.00781 12.0078C4.00781 13.1016 4.21094 14.1406 4.61719 15.125C5.03906 16.0938 5.60938 16.9375 6.32812 17.6562C7.0625 18.375 7.91406 18.9453 8.88281 19.3672C9.85156 19.7891 10.8906 20 12 20Z"
      fill={color}
    />
  </Svg>
);

export default DoneIconOutline;
