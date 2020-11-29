import React, {FC} from 'react';
import {Form, Button, DatePicker} from 'antd';
// import dayjs from 'dayjs';
import {
  getTimeRange,
  SearchType,
  format,
  SEARCH_HISTORY_FORMATTED_TIME,
} from 'shared-logic';

const {RangePicker} = DatePicker;

type Props = {
  onSubmit: (params: any) => void;
};

type FormProps = {
  fromTo: Array<Date>;
};

const DeviceSearchForm: FC<Props> = ({onSubmit}) => {
  const [form] = Form.useForm();
  const onFinish = (fieldsValue: FormProps) => {
    const rangeTimeValue = fieldsValue['fromTo'];
    const values = {
      ...fieldsValue,
      fromTo: [
        format(rangeTimeValue[0], SEARCH_HISTORY_FORMATTED_TIME),
        format(rangeTimeValue[1], SEARCH_HISTORY_FORMATTED_TIME),
      ],
    };
    onSubmit(values);
  };

  function searchByRange(type: SearchType) {
    const range = getTimeRange(type);
    form.setFieldsValue({
      fromTo: range?.original,
    });
  }

  return (
    <div>
      <Form
        layout="inline"
        name="time_related_controls"
        onFinish={onFinish}
        form={form}>
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
          <Button
            type="default"
            onClick={() => searchByRange(SearchType.TODAY)}>
            Ngày hôm nay
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            onClick={() => searchByRange(SearchType.YESTERDAY)}>
            Ngày hôm qua
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            onClick={() => searchByRange(SearchType.ONE_HOUR_AGO)}>
            1 giờ trước
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            onClick={() => searchByRange(SearchType.THIRTY_MINUTES_AGO)}>
            30 phút trước
          </Button>
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
