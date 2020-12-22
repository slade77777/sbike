import React, {FC} from 'react';
import {Form, Button, DatePicker} from 'antd';
// import dayjs from 'dayjs';
import {
  getTimeRange,
  SearchType,
  format,
  SEARCH_HISTORY_FORMATTED_TIME,
} from 'shared-logic';
import SelectDevices from './SelectDevices';

const {RangePicker} = DatePicker;

type Props = {
  onSubmit: (params: {deviceID: string; fromTo: Array<string>}) => void;
  selectedDeviceId?: string;
};

export type FormProps = {
  deviceID: string;
  fromTo: Array<Date>;
};

const DeviceSearchForm: FC<Props> = ({onSubmit, selectedDeviceId}) => {
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
          name="deviceID"
          label="Chọn xe"
          initialValue={selectedDeviceId}>
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
    </div>
  );
};

export default DeviceSearchForm;
