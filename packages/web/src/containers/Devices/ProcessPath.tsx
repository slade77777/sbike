import React, {FC} from 'react';
import {Progress} from 'antd';

type Props = {
  percent: number;
};
const ProcessPath: FC<Props> = ({percent}) => {
  console.log(percent);
  return (
    <Progress percent={Math.round(percent)} status="active" size="small" />
  );
};

export default ProcessPath;
