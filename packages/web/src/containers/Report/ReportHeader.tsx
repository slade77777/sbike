import React, {FC} from 'react';
import styled from 'styled-components';
import {Button, DatePicker, Form, InputNumber} from 'antd';
import {format, SEARCH_HISTORY_FORMATTED_TIME} from 'shared-logic';
const {RangePicker} = DatePicker;
import SelectDevices from '../Devices/SelectDevices';

// type FormProps = {
//   fromTo: Array<Date>;
// };

export type ReportSearchParam = {
  deviceID: string;
  fromTo: string[];
  speed: number;
};

type Props = {
  onSubmit?: (ReportSearchParam: any) => void;
};

const ReportHeader: FC<Props> = ({onSubmit}) => {
  const onFinish = (fieldsValue: ReportSearchParam) => {
    const rangeTimeValue = fieldsValue['fromTo'];
    const values = {
      ...fieldsValue,
      fromTo: [
        format(rangeTimeValue[0], SEARCH_HISTORY_FORMATTED_TIME),
        format(rangeTimeValue[1], SEARCH_HISTORY_FORMATTED_TIME),
      ],
    };
    onSubmit?.(values);
  };
  return (
    <StyledHeader>
      <Form layout="inline" onFinish={onFinish}>
        <Form.Item name="deviceID" label="Chọn xe">
          <SelectDevices />
        </Form.Item>
        <Form.Item
          name="fromTo"
          label="Thời gian"
          rules={[
            {type: 'array', required: true, message: 'Please select time!'},
          ]}>
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={['Từ lúc', 'Tới lúc']}
          />
        </Form.Item>
        <Form.Item name="speed" label="Vận tốc giới hạn">
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
`;

export default ReportHeader;
