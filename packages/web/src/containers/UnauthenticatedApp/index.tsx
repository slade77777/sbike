import React from 'react';
import {Row, Col, Typography} from 'antd';
import Login from '../../pages/Login';
import Logo from '../../components/Logo';

const {Title} = Typography;

function UnauthenticatedApp() {
  return (
    <div style={{paddingTop: 50}}>
      <Logo status="large" />
      <Title style={{textAlign: 'center', paddingTop: 30}} level={3}>
        Đăng nhập
      </Title>
      <Row justify="center">
        <Col xs={24} sm={12} md={6} lg={6} xl={4}>
          <Login />
        </Col>
      </Row>
    </div>
  );
}

export default UnauthenticatedApp;
