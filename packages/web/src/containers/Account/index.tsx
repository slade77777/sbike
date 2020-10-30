import React, {useState} from 'react';
import {insertUser} from 'shared-logic';
import {useMutation} from 'react-query';
import {Button, Card, Col, Row} from 'antd';
import {encrypt} from '../../utils/aesUtil';
import AccountForm from './AccountForm';
import AccountsList from './AccountsList';

const Account = () => {
  const [insertMutate, {isLoading, isError, error}] = useMutation(insertUser);
  const [newUser, setNewUser] = useState<string>('');

  const handleAddingUser = async (values: {
    userName: string;
    password: string;
  }) => {
    // insertUser(values);
    const insertedUser: {result: boolean} = await insertMutate({
      params: {
        ...values,
        password: encrypt(values.password),
      },
      session: localStorage.getItem('session') || '',
    });
    if (insertedUser.result) {
      setNewUser(values.userName);
    }
  };

  return (
    <Row gutter={16}>
      <Col span={18}>
        <Card
          title="Tài khoản"
          extra={<Button type="primary">Thêm mới</Button>}>
          <AccountsList accounts={[newUser]} />
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Thêm mới tài khoản">
          <AccountForm
            addUser={handleAddingUser}
            {...{isLoading, isError, error}}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Account;
