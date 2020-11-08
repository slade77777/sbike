import React from 'react';
import {Card, Col, Row} from 'antd';
import {useAuthState} from '../../context/auth-context';
import AccountForm from '../Account/AccountForm';

const Profile = () => {
  const {userInfo} = useAuthState();
  return (
    <Card title="Thông tin cá nhân">
      <Row>
        <Col span={8}>
          <AccountForm updatingUser={userInfo} />
        </Col>
      </Row>
    </Card>
  );
};

export default Profile;
