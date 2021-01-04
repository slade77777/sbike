import React from 'react';
import {useQuery} from 'react-query';
import {Card} from 'antd';
import {getAllCompanies} from 'shared-logic';
import usePermission from '../../hooks/usePermission';
import CompaniesList from './CompaniesList';
import CreateNewCompanyButton from './CreateNewCompanyButton';

const CompanyWrapper = () => {
  const {canViewCompanies} = usePermission();

  const {data, isLoading} = useQuery('companies', getAllCompanies, {
    enabled: canViewCompanies,
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
