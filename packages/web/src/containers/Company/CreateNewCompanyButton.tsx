import React from 'react';
import {Button} from 'antd';
import {useMutation} from 'react-query';
import {createOrUpdateCompany} from 'shared-logic';
import {useModalContext} from '../../context/modal-context';
import CompanyForm from './CompanyForm';

const CreateNewCompanyButton = () => {
  const {dispatch} = useModalContext();

  const {mutate, isLoading} = useMutation(createOrUpdateCompany, {
    onSuccess: async () => {
      dispatch?.({type: 'close'});
    },
  });

  function createNewCompany() {
    dispatch?.({
      type: 'open',
      payload: {
        title: 'Thêm công ty',
        modalComponent: <CompanyForm loading={isLoading} onSubmit={mutate} />,
      },
    });
  }
  return (
    <Button type="primary" onClick={createNewCompany}>
      Thêm công ty
    </Button>
  );
};

export default CreateNewCompanyButton;
