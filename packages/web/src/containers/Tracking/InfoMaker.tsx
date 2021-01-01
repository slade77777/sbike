import React, {FC} from 'react';
import {Device, format, getFullYear} from 'shared-logic';
import styled from 'styled-components';

type Props = {
  device: Device;
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
      <div>Tốc độ: {device?.position?.speed}</div>
      <br />
      <span>
        Tọa độ: {device?.position?.latitude}, {device?.position?.latitude}
      </span>
      <div>Cường độ sóng: {device?.position?.csq}</div>
      <div>Động cơ: {(device?.position?.status! & 1) == 0 ? 'Tắt' : 'Bật'}</div>
      <div>Điện áp ắc quy: {device?.position?.batteryVoltage}</div>
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
  line-height: 16px;
  background-color: #fff;
  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.3);
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
