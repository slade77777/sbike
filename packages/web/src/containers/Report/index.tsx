import React from 'react';
import styled from 'styled-components';
import {useDeviceByCompany, useUserInfo} from 'shared-logic';
import {useRouteMatch} from 'react-router-dom';
import ReportLayout from './ReportLayout';

const Report = () => {
  const {params} = useRouteMatch<{type: string}>();
  const userRes = useUserInfo();
  const {data} = useDeviceByCompany(userRes.data?.data?.companyID);
  return (
    <StyledLayout>
      <ReportLayout type={params?.type} devices={data?.data} />
    </StyledLayout>
  );
};

const StyledLayout = styled.div``;

export default Report;
