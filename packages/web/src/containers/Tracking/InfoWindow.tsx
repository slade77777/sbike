import React, {FC} from 'react';
import styled from 'styled-components';
import {Device, format} from 'shared-logic';

const InfoWindow: FC<{device: Device}> = ({device}) => {
  return (
    <StyledTooltip>
      <StyledContent>
        <div>{device.carNumber}</div>
        <div>{format(device?.position?.deviceTime, 'HH:mm:ss DD/MM/YYYY')}</div>
        <p>Tốc độ: {device?.position?.speed}</p>
        <div>
          Tọa độ: {device?.position?.latitude}, {device?.position?.longitude}
        </div>
        <div>Cường độ sóng (GSM, GPS): {device?.position?.csq}</div>
        <div>Động cơ: {device?.position?.status}</div>
        <div>Điện áp ắc quy: {device?.position?.batteryVoltage}</div>
        <div>Ngày hết hạn: {format(device?.expriedDate)}</div>
      </StyledContent>
    </StyledTooltip>
  );
};

const StyledTooltip = styled.div`
  position: relative;
  bottom: 250px;
  left: -100px;
  width: 250px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.3);
  padding: 10px;
  z-index: 100;
  font-size: 13px;
  line-height: 20px;
  &:before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 10px 0 10px;
    border-color: #ffffff transparent transparent transparent;
  }
`;

const StyledContent = styled.div`
  text-align: center;
`;

export default InfoWindow;
