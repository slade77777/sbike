import React, {FC} from 'react';
import styled from 'styled-components';
import {Button, DatePicker, Form} from 'antd';
import {
  format,
  SEARCH_HISTORY_FORMATTED_TIME,
  SearchType,
  getTimeRange,
} from 'shared-logic';
const {RangePicker} = DatePicker;
import SelectDevices from '../Devices/SelectDevices';

export type ReportSearchParam = {
  deviceID: string;
  fromTo: string[];
  speed: number;
};

type Props = {
  onSubmit?: (ReportSearchParam: any) => void;
};

const ReportHeader: FC<Props> = ({onSubmit}) => {
  const [form] = Form.useForm();
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

  function searchByRange(type: SearchType) {
    const range = getTimeRange(type);
    form.setFieldsValue({
      fromTo: range?.original,
    });
  }

  return (
    <StyledHeader>
      <Form layout="inline" onFinish={onFinish} form={form}>
        <Form.Item
          name="deviceID"
          rules={[{required: true, message: 'Chưa chọn xe'}]}>
          <SelectDevices />
        </Form.Item>
        <Form.Item
          name="fromTo"
          rules={[
            {type: 'array', required: true, message: 'Please select time!'},
          ]}>
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={['Từ lúc', 'Tới lúc']}
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={() => searchByRange(SearchType.TODAY)}>
            Hôm nay
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => searchByRange(SearchType.YESTERDAY)}>
            Hôm qua
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => searchByRange(SearchType.ONE_HOUR_AGO)}>
            1h trước
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => searchByRange(SearchType.THIRTY_MINUTES_AGO)}>
            30p trước
          </Button>
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
