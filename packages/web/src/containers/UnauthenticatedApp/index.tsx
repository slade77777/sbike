import React from 'react';
import {Row, Col, Typography} from 'antd';
import Login from '../../pages/Login';

const {Title} = Typography;

function UnauthenticatedApp() {
  return (
    <div style={{paddingTop: 50}}>
      <Title style={{textAlign: 'center'}} level={2}>
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
