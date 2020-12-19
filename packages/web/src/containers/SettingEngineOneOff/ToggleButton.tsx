import React, {FC} from 'react';
import {PoweroffOutlined} from '@ant-design/icons';
import {Button, Space, Typography} from 'antd';

const {Title} = Typography;

export type EngineStatus = 'on' | 'off';

type Props = {
  onClick?: () => void;
  status: EngineStatus;
  isLoading?: boolean;
};

const ToggleButton: FC<Props> = ({isLoading, onClick, status}) => {
  return (
    <Space direction="vertical" size="small">
      <Button
        shape="circle"
        loading={isLoading}
        danger={status === 'on'}
        type={status === 'on' ? 'default' : 'primary'}
        style={{width: 60, height: 60}}
        onClick={onClick}
        icon={<PoweroffOutlined style={{fontSize: 24}} />}
      />
      <Title level={5}>{status === 'on' ? 'Tắt' : 'Bật'} máy</Title>
    </Space>
  );
};

export default ToggleButton;
