import React, {useReducer, useState} from 'react';
import {
  insertUser,
  PERMISSION_UPDATE_COMPANY,
  PERMISSION_UPDATE_USER,
  User,
} from 'shared-logic';
import {useMutation} from 'react-query';
import {Button, Card, Col, message, Modal, Row} from 'antd';
import {encrypt} from '../../utils/aesUtil';
// import useModal from '../../hooks/useModal';
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

type State = {
  modal: boolean;
  users: User[];
  updatingData?: User | null;
};

type Action = {
  type: string;
  data?: User | null;
};

const initialState: State = {
  modal: false,
  users: ACCOUNTS,
  updatingData: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        modal: true,
        updatingData: null,
      };
    case 'add-success':
      return {
        ...state,
        modal: false,
        users: action.data ? [...state.users, action.data] : state.users,
        updatingData: null,
      };
    case 'update':
      return {
        ...state,
        modal: true,
        updatingData: action.data,
      };

    default:
      return {
        ...state,
        modal: false,
      };
  }
}

const Account = () => {
  const [insertMutate, {isLoading, isError}] = useMutation(insertUser);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddingUser = async (values: {
    userName: string;
    password: string;
  }) => {
    const res = await insertMutate({
      ...values,
      password: encrypt(values.password),
    });
    if (res?.data?.result) {
      dispatch({type: 'add-success', data: values});
      message.success('Thêm mới thành công!');
    }
  };

  function handleUpdatingUser(user: User) {
    dispatch({type: 'update', data: user});
  }

  function handleCloseModal() {
    dispatch({type: 'close-modal'});
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title="Quản lý tài khoản"
            extra={
              <Button type="primary" onClick={() => dispatch({type: 'add'})}>
                Thêm mới
              </Button>
            }>
            <AccountsList
              accounts={state.users}
              editUser={handleUpdatingUser}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        title={state.updatingData ? 'Cập nhật thông tin' : 'Thêm mới'}
        visible={state.modal}
        destroyOnClose
        footer={false}
        onCancel={handleCloseModal}>
        <AccountForm
          addUser={handleAddingUser}
          updatingUser={state.updatingData}
          isLoading={isLoading}
          isError={isError}
          error={{message: 'error'}}
        />
      </Modal>
    </>
  );
};

export default Account;
