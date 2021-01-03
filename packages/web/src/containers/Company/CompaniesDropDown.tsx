import React, {FC} from 'react';
import {Select} from 'antd';
import {useQuery} from 'react-query';
import {Company, getAllCompanies} from 'shared-logic';
import {useAuthState} from '../../context/auth-context';
import {hasCompanyPermission} from '../../utils/checkPermission';

const {Option} = Select;

type Props = {};

const CompaniesDropDown: FC<Props> = (props) => {
  const {userInfo} = useAuthState();
  const hasPermission = hasCompanyPermission(userInfo?.permission || []);

  const {data, isLoading} = useQuery('companies', getAllCompanies, {
    enabled: hasPermission,
  });

  return (
    <Select
      showSearch
      {...props}
      disabled={!hasPermission}
      loading={isLoading}
      style={{width: 200}}
      placeholder="Chọn công ty"
      optionFilterProp="children"
      filterOption={(input, option: any) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }>
      {data?.data?.map((company: Company) => (
        <Option key={company.companyID} value={company.companyID || ''}>
          {company.companyName}
        </Option>
      ))}
    </Select>
  );
};

export default CompaniesDropDown;
