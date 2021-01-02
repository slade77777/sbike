import React, {FC, useCallback} from 'react';
import {Button} from 'antd';
import {useMutation} from 'react-query';
import {Company, createOrUpdateCompany} from 'shared-logic';
import {EditOutlined} from '@ant-design/icons';
import {useModalContext} from '../../context/modal-context';
import CompanyForm from './CompanyForm';

type Props = {
  currentCompany: Company;
};
const CreateNewCompanyButton: FC<Props> = ({currentCompany}) => {
  const {dispatch} = useModalContext();

  const {mutate, isLoading} = useMutation(createOrUpdateCompany, {
    onSuccess: async () => {
      dispatch?.({type: 'close'});
    },
  });

  const openToUpdate = useCallback(() => {
    dispatch?.({
      type: 'open',
      payload: {
        title: 'Cập nhật công ty',
        modalComponent: (
          <CompanyForm
            initialValues={currentCompany}
            loading={isLoading}
            onSubmit={mutate}
          />
        ),
      },
    });
  }, [currentCompany, dispatch, isLoading, mutate]);

  return (
    <Button type="link" icon={<EditOutlined />} onClick={openToUpdate}>
      Sửa
    </Button>
  );
};

export default CreateNewCompanyButton;
