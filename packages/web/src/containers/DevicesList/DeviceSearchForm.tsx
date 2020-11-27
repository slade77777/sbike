import React, {FC} from 'react';
import {Form, Button, DatePicker} from 'antd';
import dayjs from 'dayjs';

const {RangePicker} = DatePicker;

type Props = {
  onSubmit: (params: any) => void;
};

const DeviceSearchForm: FC<Props> = ({onSubmit}) => {
  const onFinish = (fieldsValue: any) => {
    // Should format date value before submit.
    const rangeTimeValue = fieldsValue['fromTo'];
    const values = {
      ...fieldsValue,
      fromTo: [
        dayjs(rangeTimeValue[0]).format('HHmmssDDMMYY'),
        dayjs(rangeTimeValue[1]).format('HHmmssDDMMYY'),
      ],
    };
    onSubmit(values);
  };
  return (
    <div>
      <Form layout="inline" name="time_related_controls" onFinish={onFinish}>
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
        <Form.Item>
          <Button type="default">Ngày hôm nay</Button>
        </Form.Item>
        <Form.Item>
          <Button type="default">Ngày hôm qua</Button>
        </Form.Item>
        <Form.Item>
          <Button type="default">1 giờ trước</Button>
        </Form.Item>
        <Form.Item>
          <Button type="default">30 phút trước</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DeviceSearchForm;
