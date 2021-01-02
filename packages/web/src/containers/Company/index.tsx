import React, {useState} from 'react';
import {useQuery} from 'react-query';
import {Card, Drawer} from 'antd';
import {Company, getAllCompanies} from 'shared-logic';
import {useAuthState} from '../../context/auth-context';
import {canGetAllCompanies} from '../../utils/checkPermission';
import CompaniesList from './CompaniesList';

const CompanyWrapper = () => {
  const {userInfo} = useAuthState();
  const havePermissionToGetAllCompanies = canGetAllCompanies(
    userInfo?.permission || [],
  );

  const {data, isLoading} = useQuery('companies', getAllCompanies, {
    enabled: havePermissionToGetAllCompanies,
  });

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const onClose = () => {
    setSelectedCompany(null);
  };

  function openDrawerDetail(vl: Company) {
    setSelectedCompany(vl);
  }

  return (
    <>
      <Card title="Danh sách công ty" bodyStyle={{padding: 0}}>
        <CompaniesList
          companies={data?.data || []}
          isLoading={isLoading}
          selectCompany={openDrawerDetail}
        />
      </Card>
      <Drawer
        title={`Chi tiết công ty ${selectedCompany?.companyName}`}
        placement="right"
        width={320}
        closable={false}
        onClose={onClose}
        visible={!!selectedCompany}>
        <div>
          <div>Mã công ty: {selectedCompany?.companyID}</div>
          <div>Công ty quản lý: {selectedCompany?.companyManagerID}</div>
          <div>Tạo bởi: {selectedCompany?.createBy}</div>
        </div>
      </Drawer>
    </>
  );
};

export default CompanyWrapper;
