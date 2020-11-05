import React, {FC} from 'react';
import {Layout} from 'antd';
import LogoutButton from './LogoutButton';

type Props = {
  title?: string;
};

const Header: FC<Props> = ({title = 'Header'}) => {
  return (
    <Layout.Header className="l-header" style={{padding: '0 20px'}}>
      <div>{title}</div>
      <LogoutButton />
    </Layout.Header>
  );
};

export default Header;
