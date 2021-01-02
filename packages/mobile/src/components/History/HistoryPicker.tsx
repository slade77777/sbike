import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

type Props = {
  chooseDate: Function,
  dateChoice: Date
};

export const HistoryPicker: React.FC<Props> = ({chooseDate, dateChoice}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleConfirm = (date: Date) => {
    chooseDate(date);
    setPickerVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setPickerVisible(true)} style={style.input} >
        <Text style={{ fontSize: 10}}>
          {dayjs(dateChoice).format('DD/MM/YYYY H:mm')}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        date={dateChoice}
        isVisible={isPickerVisible}
        mode="datetime"
        locale="vi_Vi"
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
      />
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    height: 40,
    width: 150,
  },
});
