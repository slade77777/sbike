import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {SearchItem} from './SearchItem';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from 'dayjs';

export const DateTimeSearchItem = (props) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showPicker = () => {
    setPickerVisible(true);
  }

  const hidePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(date);
    hidePicker();
  };

  return (
    <View>
      <SearchItem 
        title={props.title} 
        value={dayjs(selectedDate).format('HH:mm DD/MM/YYYY')}
        onPress={showPicker}
      />
      <DateTimePickerModal
        date={selectedDate}
        isVisible = {isPickerVisible}
        mode = "datetime"
        onConfirm = {handleConfirm}
        onCancel = {hidePicker}
      />
    </View>
  );
};