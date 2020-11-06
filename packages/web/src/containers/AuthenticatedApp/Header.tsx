import React, {FC} from 'react';
import {Layout} from 'antd';
import LogoutButton from './LogoutButton';

type Props = {
  title?: string;
};

const Header: FC<Props> = ({title = 'Sbike Admin Dashboard'}) => {
  return (
    <Layout.Header className="l-header" style={{padding: '0 20px'}}>
      <h3>{title}</h3>
      <LogoutButton />
    </Layout.Header>
  );
};

export default Header;
