import React, {useState} from 'react';
import {
  insertUser,
  PERMISSION_UPDATE_COMPANY,
  PERMISSION_UPDATE_USER,
  User,
} from 'shared-logic';
import {useMutation} from 'react-query';
import {Button, Card, Col, message, Modal, Row} from 'antd';
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
  const [users, setUsers] = useState<User[]>(ACCOUNTS);
  const [updatingUser, setUpdatingUser] = useState<User | null>(null);

  const {visible, toggle} = useModal();

  const handleAddingUser = async (values: {
    userName: string;
    password: string;
  }) => {
    const res = await insertMutate({
      ...values,
      password: encrypt(values.password),
    });
    if (res?.data?.result) {
      setUsers((prevState) => prevState.concat(values));
      message.success('Thêm mới thành công!');
      toggle();
    }
  };

  function handleUpdatingUser(user: User) {
    toggle();
    setUpdatingUser(user);
  }

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
            <AccountsList accounts={users} editUser={handleUpdatingUser} />
          </Card>
        </Col>
      </Row>
      <Modal
        title={updatingUser ? 'Cập nhật thông tin' : 'Thêm mới'}
        visible={visible}
        destroyOnClose
        footer={false}
        onCancel={toggle}>
        <AccountForm
          addUser={handleAddingUser}
          updatingUser={updatingUser}
          isLoading={isLoading}
          isError={isError}
          error={{message: 'error'}}
        />
      </Modal>
    </>
  );
};

export default Account;
