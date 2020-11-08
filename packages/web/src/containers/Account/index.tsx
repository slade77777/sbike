import React, {useReducer} from 'react';
import {
  AccountAction,
  PERMISSION_UPDATE_COMPANY,
  PERMISSION_UPDATE_USER,
  User,
} from 'shared-logic';
import {Button, Card, Col, Modal, Row} from 'antd';
import {ACCOUNT_MANAGEMENT} from '../../contants/pageNames';
import {FormActionType, FormTitleEnum, ModalEnum} from '../../contants/form';
import labels from '../../contants/labels';
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
  type: FormActionType | ModalEnum;
  data?: User | null;
};

const initialState: State = {
  modal: false,
  users: ACCOUNTS,
  updatingData: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case FormActionType.OPEN_INSERT:
      return {
        ...state,
        modal: true,
        updatingData: null,
      };
    case FormActionType.INSERT_SUCCESS:
      return {
        ...state,
        modal: false,
        users: action.data ? [...state.users, action.data] : state.users,
      };
    case FormActionType.OPEN_UPDATE:
      return {
        ...state,
        modal: true,
        updatingData: action.data,
      };

    case FormActionType.UPDATE_SUCCESS:
      return {
        ...state,
        modal: false,
        updatingData: null,
      };

    default:
      return {
        ...state,
        modal: false,
      };
  }
}

const Account = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSuccess(actionType: AccountAction, data?: User) {
    if (actionType === AccountAction.INSERT) {
      dispatch({type: FormActionType.INSERT_SUCCESS, data});
    } else {
      dispatch({type: FormActionType.UPDATE_SUCCESS});
    }
  }

  function openToUpdateUser(user: User) {
    dispatch({type: FormActionType.OPEN_UPDATE, data: user});
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title={ACCOUNT_MANAGEMENT}
            extra={
              <Button
                type="primary"
                onClick={() => dispatch({type: FormActionType.OPEN_INSERT})}>
                {labels.ADD_NEW}
              </Button>
            }>
            <AccountsList accounts={state.users} editUser={openToUpdateUser} />
          </Card>
        </Col>
      </Row>
      <Modal
        title={
          state.updatingData
            ? FormTitleEnum.UPDATE_USER
            : FormTitleEnum.ADD_NEW_USER
        }
        visible={state.modal}
        destroyOnClose
        footer={false}
        onCancel={() => dispatch({type: ModalEnum.CLOSE_MODAL})}>
        <AccountForm
          onSuccess={handleSuccess}
          updatingUser={state.updatingData}
        />
      </Modal>
    </>
  );
};

export default Account;
