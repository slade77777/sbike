import React, {FC} from 'react';
import {Slider} from 'antd';

type Props = {
  steps: number;
  value: number;
  onChange?: (vl: number) => void;
  afterChange?: (vl: number) => void;
};
const ProcessPath: FC<Props> = ({afterChange, steps, value, onChange}) => {
  return (
    // <Progress percent={Math.round(percent)} status="active" size="small" />
    <Slider
      value={value}
      onChange={onChange}
      min={0}
      max={steps}
      onAfterChange={afterChange}
    />
  );
};

export default React.memo(ProcessPath);
