import React from 'react';
import {useMutation} from 'react-query';
import {KeyOutlined} from '@ant-design/icons';
import {Button, message} from 'antd';
import {AccountAction, createOrUpdateUser} from 'shared-logic';
import {useModalContext} from '../../context/modal-context';
import ChangePasswordForm from '../Account/ChangePasswordForm';
import {useAuthState} from '../../context/auth-context';

const ChangedPassword = () => {
  const {dispatch} = useModalContext();
  const {userInfo} = useAuthState();

  const {mutate, isLoading} = useMutation(createOrUpdateUser, {
    onSuccess: async () => {
      message.success('Thay đổi mật khẩu thành công');
      dispatch?.({type: 'close'});
    },
    onError: async () => {
      message.error('Không thành công, vui lòng thử lại');
    },
  });

  function handleSubmit(newPass: string) {
    if (userInfo) {
      mutate?.({
        params: {
          ...userInfo,
          password: newPass,
        },
        type: AccountAction.UPDATE,
      });
    }
  }

  function openToChange() {
    dispatch?.({
      type: 'open',
      payload: {
        title: 'Thay đổi mật khẩu',
        modalComponent: (
          <ChangePasswordForm onSubmit={handleSubmit} isLoading={isLoading} />
        ),
      },
    });
  }
  return (
    <Button type="link" block icon={<KeyOutlined />} onClick={openToChange}>
      Đổi mật khẩu
    </Button>
  );
};

export default ChangedPassword;
