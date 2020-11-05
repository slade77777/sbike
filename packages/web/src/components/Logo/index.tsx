import React, {FC} from 'react';
import './logo.scss';
// @ts-ignore
import LogoSVG from '../../images/logo.svg';

type Props = {
  status: 'small' | 'large';
};

const Logo: FC<Props> = ({status}) => {
  return (
    <div className="logo">
      <LogoSVG className={status} />
    </div>
  );
};

export default Logo;
