import React, {useState} from 'react';
import {insertUser} from 'shared-logic';
import {useMutation} from 'react-query';
import {Card, Col, Row} from 'antd';
import {encrypt} from '../../utils/aesUtil';
import AccountsList from './AccountsList';
import AccountModal from './AccountModal';

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
      <Col span={24}>
        <Card
          title="Tài khoản"
          extra={
            <AccountModal
              addUser={handleAddingUser}
              {...{isLoading, isError, error}}
            />
          }>
          <AccountsList accounts={[newUser]} />
        </Card>
      </Col>
    </Row>
  );
};

export default Account;
