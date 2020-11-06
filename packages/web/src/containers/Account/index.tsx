import React, {useState} from 'react';
import {insertUser} from 'shared-logic';
import {useMutation} from 'react-query';
import {Button, Card, Col, Row} from 'antd';
import {encrypt} from '../../utils/aesUtil';
import ModalWrapper from '../../components/ModalWrapper';
import useModal from '../../hooks/useModal';
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
    const insertedUser = await insertMutate({
      params: {
        ...values,
        password: encrypt(values.password),
      },
      session: localStorage.getItem('session') || '',
    });
    if (insertedUser?.data?.result) {
      setNewUser(values.userName);
    }
  };

  const {visible, toggle} = useModal();

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Card
          title="Quản lý tài khoản"
          extra={
            <ModalWrapper
              title="Thêm mới user"
              visible={visible}
              onClose={toggle}
              hasFooter={false}
              modalContent={
                <AccountForm
                  addUser={handleAddingUser}
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                />
              }
              modalAction={
                <Button type="primary" onClick={toggle}>
                  Thêm mới
                </Button>
              }
            />
          }>
          <AccountsList accounts={[newUser]} />
        </Card>
      </Col>
    </Row>
  );
};

export default Account;
