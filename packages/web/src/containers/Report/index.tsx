import React from 'react';
import styled from 'styled-components';
import {ReportType} from 'shared-logic';
import {useRouteMatch} from 'react-router-dom';
import ReportLayout from './ReportLayout';

const Report = () => {
  const {params} = useRouteMatch<{type: ReportType}>();
  return (
    <StyledLayout>
      <ReportLayout type={params?.type} />
    </StyledLayout>
  );
};

const StyledLayout = styled.div``;

export default Report;
