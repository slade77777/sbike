import React, {FC, useState} from 'react';
import {Button, Modal} from 'antd';
import AccountForm from './AccountForm';

type Props = {
  addUser: (values: any) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
};
const AccountModal: FC<Props> = ({addUser, ...props}) => {
  const [visible, setVisible] = useState(false);

  function handleOk() {}

  function handleCancel() {
    setVisible(false);
  }

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Thêm mới
      </Button>
      <Modal
        title="Thêm mới tài khoản"
        visible={visible}
        footer={false}
        onOk={handleOk}
        onCancel={handleCancel}>
        <AccountForm addUser={addUser} {...props} />
      </Modal>
    </>
  );
};

export default AccountModal;
