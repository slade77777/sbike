import React from 'react';
import {Card} from 'antd';
import CompaniesList from './CompaniesList';

const Company = () => {
  return (
    <Card title="Danh sách công ty">
      <CompaniesList devices={[]} />
    </Card>
  );
};

export default Company;
