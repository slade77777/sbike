import React from 'react';
import {useQuery} from 'react-query';
import {Card} from 'antd';
import {getAllCompanies} from 'shared-logic';
import {useAuthState} from '../../context/auth-context';
import {canGetAllCompanies} from '../../utils/checkPermission';
import CompaniesList from './CompaniesList';
import CreateNewCompanyButton from './CreateNewCompanyButton';

const CompanyWrapper = () => {
  const {userInfo} = useAuthState();
  const havePermissionToGetAllCompanies = canGetAllCompanies(
    userInfo?.permission || [],
  );

  const {data, isLoading} = useQuery('companies', getAllCompanies, {
    enabled: havePermissionToGetAllCompanies,
  });

  return (
    <Card
      title="Danh sách công ty"
      bodyStyle={{padding: 0}}
      extra={<CreateNewCompanyButton />}>
      <CompaniesList companies={data?.data || []} isLoading={isLoading} />
    </Card>
  );
};

export default CompanyWrapper;
