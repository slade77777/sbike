import React from 'react';
import {Card, Col, Row, Spin} from 'antd';
import {useUserInfo} from 'shared-logic';
import AccountForm from '../Account/AccountForm';

const Profile = () => {
  const {data, isLoading} = useUserInfo();
  return (
    <Spin spinning={isLoading}>
      <Card title="Thông tin cá nhân">
        <Row>
          <Col span={12}>
            {data && <AccountForm updatingUser={data.data} />}
          </Col>
        </Row>
      </Card>
    </Spin>
  );
};

export default Profile;
