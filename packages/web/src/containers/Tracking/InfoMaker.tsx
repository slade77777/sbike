import React, {FC} from 'react';
import {Device, format, getFullYear} from 'shared-logic';
import styled from 'styled-components';
import {Badge} from 'antd';

type Props = {
  device: Device;
};

const EngineStatus: FC<{status: number}> = ({status}) => {
  if (status == 0) {
    return (
      <Badge
        count="Tắt"
        size="small"
        style={{backgroundColor: '#d9d9d9', color: '#999'}}
      />
    );
  }
  return (
    <Badge count="Bật" size="small" style={{backgroundColor: '#52c41a'}} />
  );
};

const InfoMaker: FC<Props> = ({device}) => {
  return (
    <StyledWrapper>
      <div>
        Biển số: <StyledCarNumber>{device.carNumber}</StyledCarNumber>
      </div>
      <div>
        {getFullYear(device?.position?.serverTime || '') > 1
          ? format(device?.position?.serverTime, 'HH:mm:ss - DD/MM/YYYY')
          : ''}
      </div>
      <div>Tốc độ: {device?.position?.speed} km/h</div>
      <br />
      <span>
        Tọa độ: {device?.position?.latitude}, {device?.position?.longitude}
      </span>
      <div>Cường độ sóng (GSM, GPS): {device?.position?.csq}</div>
      <div>
        Động cơ: <EngineStatus status={device?.position?.status! & 1} />
      </div>
      <div>Điện áp ắc quy: {device?.position?.batteryVoltage} mV</div>
      <div>
        Ngày hết hạn:{' '}
        {getFullYear(device?.expriedDate || '') > 1
          ? format(device?.expriedDate)
          : 'N/A'}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  font-size: 12px;
  min-width: 200px;
  padding: 10px;
  height: auto;
  line-height: 17px;
  font-weight: 300;
  background-color: #fff;
  box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  position: relative;
  &:before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    bottom: -8px;
    left: 50%;
    transform: translateX(calc(-50% - 5px));
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
  }
`;

const StyledCarNumber = styled.span`
  font-weight: 500;
`;

export default InfoMaker;
