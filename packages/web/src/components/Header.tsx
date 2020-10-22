import React, {FC} from 'react';
import {Link} from 'react-router-dom';
type Props = {
  username?: string;
};
const Header: FC<Props> = ({username}) => {
  return (
    <div>
      <ul>
        <Link to="/second">Second page</Link>|<Link to="/">Home</Link>
      </ul>
      <p>Hello {username}</p>
    </div>
  );
};

export default Header;
