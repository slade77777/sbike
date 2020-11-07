import React, {useState} from 'react';
import {
  insertUser,
  PERMISSION_UPDATE_COMPANY,
  PERMISSION_UPDATE_USER,
  User,
} from 'shared-logic';
import {useMutation} from 'react-query';
import {Button, Card, Col, Modal, Row} from 'antd';
import {encrypt} from '../../utils/aesUtil';
import useModal from '../../hooks/useModal';
import AccountForm from './AccountForm';
import AccountsList from './AccountsList';

const ACCOUNTS: User[] = [
  {
    userName: 'dungho',
    fullName: 'Ho Tri Dung',
    password: '123456',
    phoneNumber: '0988888888',
    companyID: 'apple',
    permission: [PERMISSION_UPDATE_USER],
    active: true,
    notificationMessage: 'abc',
  },
  {
    userName: 'tester',
    fullName: 'tester1',
    password: '123456',
    phoneNumber: '0988888888',
    companyID: 'apple',
    permission: [PERMISSION_UPDATE_COMPANY, PERMISSION_UPDATE_USER],
    active: false,
    notificationMessage: 'abc',
  },
];

const Account = () => {
  const [insertMutate, {isLoading, isError}] = useMutation(insertUser);
  const [newUser, setNewUser] = useState<string>('');

  const handleAddingUser = async (values: {
    userName: string;
    password: string;
  }) => {
    // insertUser(values);
    const insertedUser = await insertMutate({
      ...values,
      password: encrypt(values.password),
    });
    if (insertedUser?.data?.result) {
      setNewUser(values.userName);
    }
  };

  const {visible, toggle} = useModal();

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title="Quản lý tài khoản"
            extra={
              <Button type="primary" onClick={toggle}>
                Thêm mới
              </Button>
            }>
            <AccountsList accounts={ACCOUNTS} />
          </Card>
        </Col>
      </Row>
      <Modal
        title="Thêm mới user"
        visible={visible}
        destroyOnClose
        footer={false}
        width={440}
        onCancel={toggle}>
        <AccountForm
          addUser={handleAddingUser}
          isLoading={isLoading}
          isError={isError}
          error={{message: 'error'}}
        />
      </Modal>
    </>
  );
};

export default Account;
