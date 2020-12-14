import React, {FC} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{alt: string}>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

type Props = {
  text: string;
  onClick?: () => void;
};
const Marker: FC<Props> = ({text, onClick}) => {
  return <Wrapper alt={text} onClick={onClick} />;
};

export default Marker;
