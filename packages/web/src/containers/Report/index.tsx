import React from 'react';
import styled from 'styled-components';
import {useRouteMatch} from 'react-router-dom';
import ReportLayout from './ReportLayout';

const Report = () => {
  const {params} = useRouteMatch<{type: string}>();
  console.log(params);
  return (
    <StyledLayout>
      <ReportLayout type={params?.type} />
    </StyledLayout>
  );
};

const StyledLayout = styled.div``;

export default Report;
