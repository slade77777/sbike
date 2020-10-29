import React, {useState} from 'react';
import {insertUser} from 'shared-logic';
import {useMutation} from 'react-query';
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
    <div>
      <AccountForm
        addUser={handleAddingUser}
        {...{isLoading, isError, error}}
      />
      <AccountsList accounts={[newUser]} />
    </div>
  );
};

export default Account;
